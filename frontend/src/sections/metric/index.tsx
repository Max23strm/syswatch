import React from 'react'
import Cpu from './Cpu'
import Disk from './Disk'
import Ram from './Ram'
import Network from './Network'
import '../../styles/metrics.css'

const MetricsSection = () => {
    //TODO: CPU, RAM, disco y red
    return (
        <div className='metrics_container'>
            <Cpu/>
            <Disk/>
            <Ram/>
            <Network/>
        </div>
    )
}

export default MetricsSection