import { useEffect, useState } from 'react'
import { MonitorService } from '../../../bindings/changeme';

const Cpu = () => {
    const [cpuPerc, setCpuPerc] = useState(0)
    const {GetCpuPerc} = MonitorService

    useEffect(() => {
        const getP = async () => {
            const data = await GetCpuPerc()
            setCpuPerc(data === null ? 0 : data[0])
        }

        const intervalId = setInterval(getP, 2000);

        return () => clearInterval(intervalId);
  }, []); // Empty array means this effect runs once on mount
    return (
        <div class='asda'>
            Cpu {cpuPerc.toFixed(2)}%
        </div>
    )
}

export default Cpu