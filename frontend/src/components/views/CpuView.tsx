import Cpu from "../shared/Cpu";
import PageWrapper from "./PageWrapper";

const CpuView = () => (
  <PageWrapper title="CPU" subtitle="Uso del procesador en tiempo real">
    <Cpu />
  </PageWrapper>
);
export default CpuView