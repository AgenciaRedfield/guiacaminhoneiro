import { Link } from "react-router-dom";
import { AppShell, MetricCard } from "../components/ui";
import { partnerMetrics } from "../lib/mock-data";

export function PartnerPage() {
  return (
    <AppShell>
      <section className="hero">
        <div className="panel">
          <span className="badge">Area do anunciante</span>
          <h2>Seu negocio na vitrine certa para vender mais</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
            Acompanhe resultados, atualize seu anuncio e mantenha sua empresa pronta para receber contatos de motoristas que precisam do seu servico.
          </p>
          <Link className="button" to="/places/new">Cadastrar ou atualizar anuncio</Link>
        </div>
        <div className="panel">
          <h3>O que deixa seu anuncio mais forte</h3>
          <ul style={{ lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Fotos que valorizam a estrutura</li>
            <li>Horario de atendimento atualizado</li>
            <li>Servicos informados com clareza</li>
            <li>Telefone e WhatsApp para contato rapido</li>
          </ul>
        </div>
      </section>

      <section className="metric-grid">
        {partnerMetrics.map((metric) => (
          <MetricCard key={metric.label} label={metric.label} value={metric.value} helper={metric.helper} />
        ))}
      </section>
    </AppShell>
  );
}
