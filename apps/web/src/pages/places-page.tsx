import { AppShell, DynamicMap, PlaceCard } from "../components/ui";
import { mockCategories, mockPlaces } from "../lib/mock-data";

const heroCategories = [
  "Abastecimento",
  "Oficinas",
  "Borracharia",
  "Restaurantes",
  "Pernoite",
  "Guincho",
];

const routeHighlights = [
  { title: "Mais visibilidade", text: "Sua empresa ganha destaque para quem realmente precisa parar, abastecer, comer ou resolver na rota." },
  { title: "Mais contatos", text: "Mostre telefone, WhatsApp e servicos em uma vitrine pronta para gerar conversa e visita." },
  { title: "Mais confianca", text: "Fotos, localizacao e informacoes claras ajudam o motorista a escolher mais rapido e com seguranca." },
];

const conversionSteps = [
  "Busque pela cidade ou pelo tipo de servico",
  "Compare as melhores opcoes da rota",
  "Fale direto com a empresa anunciada",
  "Chegue no local com mais seguranca",
];

const feedPlaces = Array.from({ length: 6 }, (_, index) => {
  const base = mockPlaces[index % mockPlaces.length];

  return {
    ...base,
    id: `${base.id}-feed-${index}`,
  };
});

export function PlacesPage() {
  const featuredPlaces = mockPlaces.map((place) => ({
    ...place,
    categoryName: mockCategories.find((category) => category.id === place.categoryId)?.name ?? "Destaque",
  }));

  return (
    <AppShell>
      <section className="hero-banner panel">
        <div className="hero-copy-block">
          <span className="section-kicker inverse">As melhores paradas da estrada</span>
          <h1>Encontre onde abastecer, comer e seguir viagem com mais tranquilidade.</h1>
          <p>
            Descubra empresas verificadas, pontos de apoio e servicos essenciais para o caminhoneiro. Tudo em um so lugar, com contato direto e localizacao facil.
          </p>

          <form className="hero-search" onSubmit={(event) => event.preventDefault()}>
            <input type="text" placeholder="Digite a cidade ou regiao" aria-label="Selecionar local" />
            <select aria-label="Categoria de negocios" defaultValue="">
              <option value="" disabled>Escolha o tipo de servico</option>
              {mockCategories.map((category) => (
                <option key={category.id} value={category.slug}>{category.name}</option>
              ))}
            </select>
            <button type="submit">Buscar agora</button>
          </form>

          <div className="hero-tags">
            {heroCategories.map((item) => (
              <span key={item} className="hero-tag">{item}</span>
            ))}
          </div>
        </div>

        <aside className="hero-highlight">
          <span className="section-kicker">Destaques do momento</span>
          <h2>Empresas prontas para atender quem esta na estrada agora.</h2>
          <div className="hero-highlight-grid">
            <div>
              <strong>184</strong>
              <span>anuncios ativos</span>
            </div>
            <div>
              <strong>24h</strong>
              <span>apoio em operacao</span>
            </div>
            <div>
              <strong>10</strong>
              <span>categorias para buscar</span>
            </div>
            <div>
              <strong>SP</strong>
              <span>regioes em expansao</span>
            </div>
          </div>
          <div className="hero-floating-note">
            <strong>Encontre e fale na hora</strong>
            <p>Pesquise, compare as melhores opcoes e entre em contato direto com quem pode te atender agora.</p>
          </div>
        </aside>
      </section>

      <section className="insight-strip">
        {routeHighlights.map((item) => (
          <article key={item.title} className="insight-card panel">
            <span className="section-kicker">Vantagens do portal</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="section-block">
        <div className="section-header center">
          <span className="section-kicker">Empresas em destaque</span>
          <h2>As paradas mais buscadas para hoje</h2>
          <p>Selecao especial com empresas que querem aparecer mais, vender mais e receber contato mais rapido.</p>
        </div>

        <div className="featured-grid">
          {featuredPlaces.map((place) => (
            <article key={place.id} className="featured-card">
              <div
                className="featured-card-media"
                style={{ backgroundImage: `linear-gradient(180deg, rgba(9, 16, 33, 0.12), rgba(9, 16, 33, 0.74)), url(${place.photos[0]?.url})` }}
              >
                <div className="featured-card-topline">
                  <span className="status-pill">Atendimento ativo</span>
                  <span className="avatar-pill">{place.name.slice(0, 1)}</span>
                </div>
                <div className="featured-card-copy">
                  <small>{place.categoryName}</small>
                  <h3>{place.name}</h3>
                  <span>Mais procurado</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="promo-banner">
        <div>
          <strong>Coloque sua empresa no topo e receba mais contatos qualificados</strong>
          <span>Anuncie no Guia Caminhoneiro e apareca para quem realmente esta procurando servico na estrada.</span>
        </div>
        <b>Plano destaque a partir de R$ 74/mensal</b>
      </section>

      <section className="portal-grid">
        <article className="panel route-panel">
          <div className="section-header compact">
            <div>
              <span className="section-kicker">Como funciona</span>
              <h2>Encontre a empresa certa em poucos passos</h2>
            </div>
            <p>Uma jornada simples para o motorista e uma vitrine objetiva para o anunciante vender mais.</p>
          </div>
          <div className="steps-grid">
            {conversionSteps.map((step, index) => (
              <div key={step} className="step-card">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="panel cta-panel">
          <span className="section-kicker">Anuncie no portal</span>
          <h2>Transforme sua empresa em referencia para quem vive na estrada.</h2>
          <p>
            Cadastre seu negocio, destaque seus servicos e receba mais contatos de motoristas que ja estao prontos para comprar, parar ou contratar.
          </p>
          <div className="cta-stack">
            <a href="/places/new" className="button">Cadastrar meu anuncio</a>
            <a href="/partner" className="button secondary-button">Ver planos e beneficios</a>
          </div>
        </article>
      </section>

      <section className="section-block special-shell">
        <div className="section-header center">
          <span className="section-kicker">Categorias em alta</span>
          <h2>Os servicos mais procurados pelos motoristas</h2>
        </div>

        <div className="special-grid">
          {mockCategories.map((category, index) => {
            const image = feedPlaces[index % feedPlaces.length]?.photos[0]?.url;

            return (
              <article
                key={category.id}
                className="special-card"
                style={{ backgroundImage: `linear-gradient(180deg, rgba(12, 20, 38, 0.18), rgba(12, 20, 38, 0.72)), url(${image})` }}
              >
                <span className="special-icon">{String(index + 1).padStart(2, "0")}</span>
                <h3>{category.name}</h3>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-block">
        <div className="section-header center">
          <span className="section-kicker">Novos anuncios</span>
          <h2>Empresas prontas para atender na sua proxima parada</h2>
          <p>Veja quem acabou de entrar no portal e descubra novas oportunidades para abastecer, descansar ou resolver no caminho.</p>
        </div>

        <div className="listing-grid">
          {feedPlaces.map((place, index) => (
            <PlaceCard
              key={place.id}
              id={place.id.replace(/-feed-\d+$/, "")}
              name={place.name}
              description={place.description}
              city={place.city}
              state={place.state}
              rating={place.rating}
              distance={place.distanceFromRouteKm}
              image={place.photos[0]?.url}
              category={mockCategories.find((category) => category.id === place.categoryId)?.name ?? `Anuncio ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="split-section">
        <article className="panel events-panel">
          <div className="section-header compact">
            <div>
              <span className="section-kicker">Mapa interativo</span>
              <h2>Veja no mapa quem esta mais perto da sua rota</h2>
            </div>
            <p>Visualize empresas no mapa, escolha o melhor ponto da regiao e siga viagem com mais previsibilidade.</p>
          </div>
          <div className="map-frame">
            <DynamicMap places={mockPlaces} />
          </div>
        </article>

        <article className="panel info-panel">
          <span className="section-kicker">Por que anunciar</span>
          <h2>Mais visibilidade para o seu negocio, mais praticidade para o motorista.</h2>
          <ul className="check-list">
            <li>apareca para quem esta procurando servico agora</li>
            <li>mostre fotos, estrutura e diferenciais do seu negocio</li>
            <li>receba contatos por telefone e WhatsApp</li>
            <li>destaque sua empresa nas categorias mais buscadas</li>
          </ul>
        </article>
      </section>
    </AppShell>
  );
}
