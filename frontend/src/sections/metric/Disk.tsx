import { useState, useEffect, useCallback } from 'react'
import { GetDiskUsage } from '../../../bindings/changeme/monitorservice'
import type { UsageStat } from '../../../bindings/github.com/shirou/gopsutil/v4/disk'

const Disk = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [disk, setDisk] = useState<UsageStat>(null)

    
    const fetchData = useCallback(async () => {
        setLoading(true)
        const data: UsageStat | null = await GetDiskUsage()
        setLoading(false)
        setDisk(data)
    },[])
    
    useEffect( () => {
        fetchData()
    }, [fetchData])
    

    if(loading) return <div>Loading....</div>

    return (
        <div>
            Disk
            <div>free: {disk.free}</div>
            <div>total: {disk.total}</div>
            <div>used: {disk.used}</div>
            <div>usedPercent: {disk.usedPercent.toFixed(2)}</div>
        </div>
    )
}

export default Disk