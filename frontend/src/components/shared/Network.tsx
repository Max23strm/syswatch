import { formatSpeed } from '../../utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { NetSpeed } from '../../../bindings/changeme';
const Network = ({netUsage}:{netUsage: NetSpeed[]}) => {

    
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