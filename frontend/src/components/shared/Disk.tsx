import type { UsageStat } from '../../../bindings/github.com/shirou/gopsutil/v4/disk'
import { bytesToGB } from '../../utils'

const Disk = ({disk}: {disk: UsageStat}) => {

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