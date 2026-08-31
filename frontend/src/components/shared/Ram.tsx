
import { bytesToGB } from "../../utils"

const Ram = ({ramUsage}) => {
    
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