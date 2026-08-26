import React from 'react'
import Cpu from './Cpu'
import Disk from './Disk'
import Ram from './Ram'
import Network from './Network'
import '../../styles/metrics.css'

import { useState, useEffect } from 'react';

const MetricsSection = () => {
    
    function useViewportWidth() {
        const [width, setWidth] = useState(window.innerWidth);

        useEffect(() => {
            const handleResize = () => setWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return width;
    }
    const width = useViewportWidth();
    //TODO: CPU, RAM, disco y red
    return (
        <div className='metrics_container'>
            <span id='medidor'>{width}</span>
            <Cpu/>
            <Disk/>
            <Ram/>
            <Network/>
        </div>
    )
}

export default MetricsSection