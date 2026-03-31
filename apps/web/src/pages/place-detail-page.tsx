import { Link, useParams } from "react-router-dom";
import { AppShell, DynamicMap } from "../components/ui";
import { mockCategories, mockPlaces } from "../lib/mock-data";

const relatedNotes = [
  "Contato direto com a empresa pelo WhatsApp",
  "Localizacao facil para chegar sem perder tempo",
  "Estrutura destacada para decidir mais rapido",
];

export function PlaceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const place = mockPlaces.find((item) => item.id === id) ?? mockPlaces[0];
  const category = mockCategories.find((item) => item.id === place.categoryId);
  const cover = place.photos.find((photo) => photo.isCover)?.url ?? place.photos[0]?.url;
  const gallery = [cover, ...place.photos.map((photo) => photo.url)].filter(Boolean).slice(0, 3) as string[];

  return (
    <AppShell>
      <section
        className="detail-hero"
        style={{ backgroundImage: `linear-gradient(180deg, rgba(8, 14, 30, 0.34), rgba(8, 14, 30, 0.78)), url(${cover})` }}
      >
        <div className="detail-hero-content">
          <span className="section-kicker inverse">{category?.name ?? "Empresa"}</span>
          <h1>{place.name}</h1>
          <div className="detail-hero-meta">
            <span>{new Date(place.createdAt).toLocaleDateString("pt-BR")}</span>
            <span>{place.city}/{place.state}</span>
            <span>{place.reviewsCount} avaliacoes</span>
            <span>Nota {place.rating.toFixed(1)}</span>
          </div>
        </div>
      </section>

      <section className="detail-layout">
        <article className="detail-main">
          <div className="detail-overview-grid">
            <div className="detail-photo-card panel">
              <img src={cover} alt={place.name} className="detail-main-image" />
              <div className="detail-summary">
                <p>{place.description}</p>
                <p><strong>Endereco:</strong> {place.address}, {place.city}/{place.state}</p>
                <p><strong>Horario:</strong> {place.openingHours.join(", ")}</p>
              </div>
            </div>

            <div className="detail-glance panel">
              <span className="section-kicker">Destaques do anuncio</span>
              <h2>Informacoes para decidir sua proxima parada</h2>
              <div className="detail-mini-stats large">
                <div>
                  <strong>{place.rating.toFixed(1)}</strong>
                  <span>nota media</span>
                </div>
                <div>
                  <strong>{place.distanceFromRouteKm?.toFixed(1) ?? "0.0"} km</strong>
                  <span>da sua rota</span>
                </div>
                <div>
                  <strong>{place.reviewsCount}</strong>
                  <span>avaliacoes</span>
                </div>
                <div>
                  <strong>{place.services.length}</strong>
                  <span>servicos em destaque</span>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-gallery-grid">
            {gallery.map((image, index) => (
              <div key={`${image}-${index}`} className="detail-gallery-card panel">
                <img src={image} alt={`${place.name} ${index + 1}`} className="detail-gallery-image" />
              </div>
            ))}
          </div>

          <div className="panel detail-section">
            <div className="section-header compact detail-section-head">
              <div>
                <span className="section-kicker">O que voce encontra aqui</span>
                <h2>Estrutura pensada para atender bem na estrada</h2>
              </div>
              <p>Veja os principais servicos e facilidades antes de sair da rota e fale direto com a empresa.</p>
            </div>
            <div className="feature-grid">
              {place.services.map((service) => (
                <span key={service.id} className="feature-chip">{service.name}</span>
              ))}
              {place.acceptsLargeTruck ? <span className="feature-chip">Aceita caminhao</span> : null}
              {place.acceptsTrailer ? <span className="feature-chip">Aceita carreta</span> : null}
              {place.acceptsBitrem ? <span className="feature-chip">Aceita bitrem</span> : null}
            </div>
          </div>

          <div className="panel detail-section detail-notes-panel">
            <div className="section-header compact detail-section-head">
              <div>
                <span className="section-kicker">Por que escolher</span>
                <h2>Vantagens que fazem esse anuncio se destacar</h2>
              </div>
            </div>
            <div className="notes-grid">
              {relatedNotes.map((item) => (
                <div key={item} className="note-card">
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="panel detail-section">
            <h2>Como chegar</h2>
            <div className="map-frame detail-map-frame">
              <DynamicMap places={[place]} />
            </div>
          </div>
        </article>

        <aside className="detail-sidebar">
          <div className="panel sidebar-card profile-card sticky-card">
            <div className="profile-avatar">{place.name.slice(0, 1)}</div>
            <strong>{place.name}</strong>
            <span>{place.city}/{place.state}</span>

            <div className="contact-list">
              <span>{place.address}</span>
              <span>{place.phone ?? "Telefone sob consulta"}</span>
              <span>{place.whatsapp ?? "WhatsApp sob consulta"}</span>
            </div>

            <div className="sidebar-actions">
              <a href={`https://wa.me/55${place.whatsapp ?? place.phone ?? ""}`} className="button">Falar com a empresa</a>
              <Link to="/places" className="button secondary-button">Voltar para anuncios</Link>
            </div>
          </div>

          <div className="panel sidebar-card">
            <h3>Resumo rapido</h3>
            <div className="detail-mini-stats">
              <div>
                <strong>{place.rating.toFixed(1)}</strong>
                <span>nota media</span>
              </div>
              <div>
                <strong>{place.distanceFromRouteKm?.toFixed(1) ?? "0.0"} km</strong>
                <span>da sua rota</span>
              </div>
              <div>
                <strong>{place.reviewsCount}</strong>
                <span>avaliacoes</span>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
