import Network from "../shared/Network";
import PageWrapper from "./PageWrapper";

const NetworkView = () => (
  <PageWrapper title="Red" subtitle="Tráfico por interfaz">
    <Network />
  </PageWrapper>
);

export default NetworkView;