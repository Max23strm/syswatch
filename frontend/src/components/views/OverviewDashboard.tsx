import Cpu from "../shared/Cpu";
import Ram from "../shared/Ram";
import Disk from "../shared/Disk";
import Network from "../shared/Network";

const OverviewDashboard = () => (
  <div className="metrics_container">
    <Cpu />
    <Disk />
    <Ram />
    <Network />
  </div>
);

export default OverviewDashboard;