import type { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

const PageHeader = ({ title, subtitle }: Props) => (
  <header className="page_header">
    <h2>{title}</h2>
    {subtitle ? <p className="subtitle">{subtitle}</p> : null}
  </header>
);

export const PageWrapper = ({ title, subtitle, children }: Props) => (
  <section className="page_wrapper">
    <PageHeader title={title} subtitle={subtitle} />
    <div className="page_body">{children}</div>
  </section>
);

export default PageWrapper;