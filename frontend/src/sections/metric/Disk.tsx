import { useState, useEffect, useCallback } from 'react'
import { GetDiskUsage } from '../../../bindings/changeme/monitorservice'
import type { UsageStat } from '../../../bindings/github.com/shirou/gopsutil/v4/disk'
import { bytesToGB } from '../../utils'

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
        <div className='disk_container'>
            <h5> Disk </h5>
            <div className='disk_data'>
                <div className='disk_data_element'>
                    <div className='disk_data_element_amount'>
                        <p className='main_number'>{bytesToGB( disk.free)}</p>
                        <p >Gb</p>
                    </div>
                    <h6>Free</h6>
                </div>
                <div className='disk_data_element'>
                    <div className='disk_data_element_amount'>
                        <p className='main_number'>{bytesToGB( disk.used)}</p>
                        <p >Gb</p>
                    </div>
                    <h6>Used</h6>
                </div>
            </div>
            <div className='disk_extra_data'>
                <div>
                    <p>total:</p>
                    <p className='number'>{bytesToGB(disk.total)}</p>
                    <p className='unit'>Gb</p>          
                </div>
                <div>
                    <p className='number'> {disk.usedPercent.toFixed(2)} </p>
                    <p className='unit'> % </p>
                    <p>used</p>
                </div>
            </div>
        </div>
    )
}

export default Disk