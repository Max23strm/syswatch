import { useEffect, useState } from 'react'
import { MonitorService } from '../../../bindings/changeme';
import { intervalTimer } from '../../utils';

const Cpu = () => {
    const [cpuPerc, setCpuPerc] = useState(0)
    const {GetCpuPerc} = MonitorService

    useEffect(() => {
        const getP = async () => {
            const data = await GetCpuPerc()
            setCpuPerc(data === null ? 0 : data[0])
        }

        const intervalId = setInterval(getP, intervalTimer);

        return () => clearInterval(intervalId);
  }, []); // Empty array means this effect runs once on mount
    return (
        <div className='cpu_container'>
            <div className='cpu_main_number_container'>
                <p className='main_number'>{cpuPerc.toFixed(2)}</p>
                <p>%</p>
            </div>
            <h5>Cpu usage</h5>
        </div>
    )
}

export default Cpu