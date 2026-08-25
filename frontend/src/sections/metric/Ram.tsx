import { GetRamUsage } from "../../../bindings/changeme/monitorservice"
import type { VirtualMemoryStat } from "../../../bindings/github.com/shirou/gopsutil/v4/mem"
import {useState, useEffect} from 'react'
import { bytesToGB, intervalTimer } from "../../utils"

const Ram = () => {

    const [ramUsage, setRamUsage] = useState<VirtualMemoryStat>(null)

    useEffect(() => {
        const getP = async () => {
            const data: VirtualMemoryStat | null = await GetRamUsage()
            setRamUsage(data === null ? null : data);
        };

        const intervalId = setInterval(getP, intervalTimer);

        return () => clearInterval(intervalId);
    }, [])
    
    if(ramUsage === null) return <p>loading...</p>

    return (
        <div className='ram_container'>
            <h5>Ram</h5>
            <div className='ram_active'>
                <div className='active_item'>
                    <div className="main_text">
                        <p>{bytesToGB(ramUsage.used)}</p>
                        <p>Gb</p>
                    </div>
                    <h6>Used</h6>
                </div>
                <div className='active_item'>
                    <div className="main_text">
                        <p>{bytesToGB(ramUsage.available)}</p>
                        <p>Gb</p>
                    </div>
                    <h6>Available</h6>
                </div>
            </div>
            <p className='ram_total'>Total: <span>{bytesToGB(ramUsage.total)}</span> Gb</p>

        </div>
    )
}

export default Ram