import { useState, useEffect} from 'react'
import { intervalTimer } from '../../utils';
import { GetNetworkData } from '../../../bindings/changeme/monitorservice';
import type { IOCountersStat } from '../../../bindings/github.com/shirou/gopsutil/v4/net';

const Network = () => {

    const [netUsage, setNetUsage] = useState<IOCountersStat[]>([])
    
    useEffect(() => {
        const getP = async () => {
            const data: IOCountersStat[] | null = await GetNetworkData()
            setNetUsage(data === null ? null : data.sort((a, b) => b.bytesRecv - a.bytesRecv));
        };

        const intervalId = setInterval(getP, intervalTimer);

        return () => clearInterval(intervalId);
    }, [])

    return (
        <div>
            Network
            <div>
                {
                    netUsage.map( n => (
                        <div>
                            <p>{n.name}</p>
                            <p>{n.bytesRecv}</p>
                            <p>{n.bytesSent}</p>
                        </div>
                    ))
                }
            </div>    
        </div>
    )
}

export default Network