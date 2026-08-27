import Disk from "../shared/Disk";
import PageWrapper from "./PageWrapper";

const DiskView = () => (
  <PageWrapper title="Disco" subtitle="Espacio libre y usado">
    <Disk />
  </PageWrapper>
);

export default DiskView;