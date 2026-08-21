import React from 'react'
import Cpu from './Cpu'
import Disk from './Disk'

const MetricsSection = () => {
    //TODO: CPU, RAM, disco y red
    return (
        <div class='metrics_container'>
            <Cpu/>
            <Disk/>
        </div>
    )
}

export default MetricsSection