import { Link } from "react-router-dom";
import type { PropsWithChildren } from "react";
import { MapView } from "./map-view";

const navigationLinks = [
  { href: "/places", label: "Inicio" },
  { href: "/partner", label: "Planos" },
  { href: "/admin", label: "Empresas" },
  { href: "/login", label: "Contato" },
];

export function Sidebar() {
  return (
    <header className="site-header">
      <div className="header-utility">
        <span>Encontre empresas, servicos e oportunidades para seguir viagem com mais seguranca.</span>
        <div className="utility-links">
          <span>Empresas em destaque</span>
          <span>Atendimento 24h</span>
          <span>Anuncie aqui</span>
        </div>
      </div>

      <div className="header-main">
        <Link to="/places" className="brand-mark" aria-label="Guia Caminhoneiro">
          <img src="/logo_guia.png" alt="Guia Caminhoneiro" className="brand-logo" />
        </Link>

        <nav className="header-nav" aria-label="Principal">
          {navigationLinks.map((link) => (
            <Link key={link.href} to={link.href} className="header-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link to="/login" className="header-icon-link" aria-label="Minha conta">
            Entrar
          </Link>
          <Link to="/places/new" className="header-cta">
            + Cadastrar anuncio
          </Link>
        </div>
      </div>
    </header>
  );
}

export function AppShell({ children }: PropsWithChildren) {
  return (
    <main className="app-shell">
      <Sidebar />
      <div className="content-grid">{children}</div>
    </main>
  );
}

export function MetricCard({ label, value, helper }: { label: string; value: string | number; helper?: string }) {
  return (
    <div className="panel metric-card">
      <p style={{ color: "var(--muted)" }}>{label}</p>
      <strong>{value}</strong>
      {helper ? <small style={{ color: "var(--muted)" }}>{helper}</small> : null}
    </div>
  );
}

export function PlaceCard({
  id,
  name,
  description,
  city,
  state,
  rating,
  distance,
  image,
  category,
}: {
  id: string;
  name: string;
  description: string;
  city: string;
  state: string;
  rating: number;
  distance?: number;
  image?: string;
  category?: string;
}) {
  return (
    <Link to={`/places/${id}`} className="listing-card">
      <div
        className="listing-card-media"
        style={image ? { backgroundImage: `linear-gradient(180deg, rgba(15, 22, 41, 0.04), rgba(15, 22, 41, 0.6)), url(${image})` } : undefined}
      >
        <div className="listing-card-topline">
          <span className="listing-badge">{category ?? `${city}/${state}`}</span>
          <span className="listing-rating">{rating.toFixed(1)}</span>
        </div>
        <div className="listing-card-overlay">
          <span className="status-pill small">Aberto agora</span>
          <span className="mini-glass-pill">Fale no WhatsApp</span>
        </div>
      </div>
      <div className="listing-card-body">
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="listing-chip-row">
          <span className="mini-chip">Atendimento rapido</span>
          <span className="mini-chip">Empresa verificada</span>
          <span className="mini-chip">Contato direto</span>
        </div>
        <div className="listing-meta">
          <span>{city}/{state}</span>
          <strong>{distance !== undefined ? `${distance.toFixed(1)} km da rota` : "Consulte localizacao"}</strong>
        </div>
      </div>
    </Link>
  );
}

export function DynamicMap(props: { places: Array<{ id: string; name: string; latitude: number; longitude: number }> }) {
  return <MapView {...props} />;
}
