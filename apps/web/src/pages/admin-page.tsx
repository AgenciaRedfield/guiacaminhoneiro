import { AppShell, MetricCard, PlaceCard } from "../components/ui";
import { adminMetrics, mockPlaces } from "../lib/mock-data";

export function AdminPage() {
  return (
    <AppShell>
      <section className="panel">
        <span className="badge">Gestao comercial</span>
        <h2>Controle os anuncios que mantem o portal ativo e atrativo</h2>
        <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
          Aprove, destaque e acompanhe os melhores anuncios para manter o Guia Caminhoneiro sempre atualizado e relevante para quem esta na estrada.
        </p>
      </section>

      <section className="metric-grid">
        {adminMetrics.map((metric) => (
          <MetricCard key={metric.label} label={metric.label} value={metric.value} helper={metric.helper} />
        ))}
      </section>

      <section className="place-grid">
        {mockPlaces.map((place) => (
          <PlaceCard key={place.id} id={place.id} name={place.name} description={place.description} city={place.city} state={place.state} rating={place.rating} distance={place.distanceFromRouteKm} />
        ))}
      </section>
    </AppShell>
  );
}
