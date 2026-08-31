import Cpu from "../shared/Cpu";
import Ram from "../shared/Ram";
import Disk from "../shared/Disk";
import Network from "../shared/Network";
import "../../styles/metrics.css";
import { MonitorService } from "../../../bindings/changeme";
import { useState, useEffect } from "react";
import { defatulMonitorState, intervalTimer } from "../../utils";
import type { MonitorStates } from "../../types";

const OverviewDashboard = () => {
  const [computerSTATS , setComputerSTATS] = useState<MonitorStates>(defatulMonitorState);
  
  const { GetCpuPerc, GetDiskUsage, GetRamUsage, GetNetworkSpeed } = MonitorService;

  useEffect(() => {
    const getStats = async () => {
      const resp = await Promise.allSettled([
        GetCpuPerc(),
        GetDiskUsage(),
        GetRamUsage(),
        GetNetworkSpeed()
      ])

      setComputerSTATS(prev =>({
          ...prev, 
          cpuPerc:resp[0].status === 'fulfilled' && resp[0].value ? resp[0].value[0] : null,
          disk: resp[1].status === 'fulfilled' ? resp[1].value : null,
          ram: resp[2].status === 'fulfilled' ? resp[2].value : null,
          netSpeed: resp[3].status === 'fulfilled' && resp[3].value ? resp[3].value.filter(n => n.recvBps > 0 || n.sentBps > 0).sort((a, b) => b.recvBps - a.recvBps) : null,
      }));
    };

    const intervalId = setInterval(getStats, intervalTimer);

    return () => clearInterval(intervalId);
  }, []);


  
  return (
      <div className="metrics_container">
          <Cpu cpuPerc={computerSTATS.cpuPerc} />
          <Disk disk={computerSTATS.disk}/>
          <Ram ramUsage={computerSTATS.ram}/>
          <Network netUsage={computerSTATS.netSpeed}/>
      </div>
  );
};

export default OverviewDashboard;
