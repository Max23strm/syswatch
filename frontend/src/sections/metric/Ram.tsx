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
        <div>
            <p>Total: {bytesToGB(ramUsage.total)} Gb</p>
            <p>Available: {bytesToGB(ramUsage.available)} Gb</p>
            <p>Used: {bytesToGB(ramUsage.used)} Gb</p>
            {/* {ramUsage} */}
        </div>
    )
}

export default Ram