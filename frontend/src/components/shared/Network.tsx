import { useState, useEffect} from 'react'
import { formatSpeed, intervalTimer } from '../../utils';
import { GetNetworkSpeed } from '../../../bindings/changeme/monitorservice';
import type { IOCountersStat } from '../../../bindings/github.com/shirou/gopsutil/v4/net';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { NetSpeed } from '../../../bindings/changeme';
const Network = () => {

    const [netUsage, setNetUsage] = useState<IOCountersStat[]>([])
    
    // useEffect(() => {
    //     const getP = async () => {
    //         const data: IOCountersStat[] | null = await GetNetworkData()
    //         setNetUsage(data === null ? null : data.sort((a, b) => b.bytesRecv - a.bytesRecv));
    //     };

    //     const intervalId = setInterval(getP, intervalTimer);

    //     return () => clearInterval(intervalId);
    // }, [])

    useEffect(() => {
    const getP = async () => {
        const data: NetSpeed[] | null = await GetNetworkSpeed();
        setNetUsage(data === null ? null : [...data].filter(n => n.recvBps > 0 || n.sentBps > 0).sort((a, b) => b.recvBps - a.recvBps));
    };

    const intervalId = setInterval(getP, intervalTimer);
    return () => clearInterval(intervalId);
}, []);

    return (
        <div className='network_container'>
            <h5> Network </h5>
            <div className='nets_elements'>
                {
                    netUsage.map( (n: NetSpeed) => {
                        const rec = formatSpeed(n.recvBps)
                        const sent = formatSpeed(n.sentBps)

                        return <div key={n.name} className='stat_container'>
                            <h6>{n.name}</h6>
                            <div className='metric_row'>
                                <ChevronDown />
                                <p className='number'>{rec.speed}</p>
                                <p className='format'>{rec.format}</p>
                            </div>
                            <div className='metric_row'>
                                <ChevronUp/>
                                <p className='number'>{sent.speed}</p>
                                <p className='format'>{sent.format}</p>
                            </div>
                        </div>
                    })
                }
            </div>    
        </div>
    )
}

export default Network