import { formatSpeed } from '../../utils';
import { ChevronDown, ChevronUp, NetworkIcon } from 'lucide-react';
import type { NetSpeed } from '../../../bindings/changeme';
import NetworkSkeleton from '../skeletons/NetworkSkeleton';

const Network = ({netUsage}:{netUsage: NetSpeed[]}) => {
    if(!netUsage.length) return <NetworkSkeleton/>

    const rec = formatSpeed(netUsage?.[0]?.recvBps) ?? null
    const sent = formatSpeed(netUsage?.[0]?.sentBps) ?? null
    
    return (
        <div className='network_container'>
            <div className='network_title'>
                <NetworkIcon/>
                <h5> Network </h5>
            </div>
            <div className='nets_elements'>
                <div key={netUsage[0]?.name} className='stat_container'>
                    <h6>{netUsage[0]?.name}</h6>
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
                {/* {
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
                } */}
            </div>    
        </div>
    )
}

export default Network