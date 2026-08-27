import { intervalTimer } from "../../utils";
import PageWrapper from "./PageWrapper";

const SettingsView = () => (
  <PageWrapper title="Ajustes" subtitle="Configuración general">
    <p>Intervalo de refresco actual: <strong>{intervalTimer} ms</strong></p>
    <p style={{ opacity: 0.6 }}>
      (Próximamente: selector persistente de intervalos 1s / 2s / 5s)
    </p>
  </PageWrapper>
);

export default SettingsView;