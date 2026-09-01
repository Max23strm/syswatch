import { ChevronDown, ChevronUp, NetworkIcon } from 'lucide-react'
import React from 'react'

const NetworkSkeleton = () => {
    return (
        <div className='network_container'>
            <div className='network_title'>
                <NetworkIcon/>
                <h5> Network </h5>
            </div>
            <div className='nets_elements'>
                <div className='stat_container'>
                    <h6>loading</h6>
                    <div className='metric_row'>
                        <ChevronDown />
                        <p className='number'>loading</p>
                    </div>
                    <div className='metric_row'>
                        <ChevronUp/>
                        <p className='number'>loading</p>
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default NetworkSkeleton