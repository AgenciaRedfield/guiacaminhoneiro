# Guia do Caminhoneiro

Monorepo base para um MVP web + mobile voltado a caminhoneiros, parceiros e administradores. A solucao foi preparada para evoluir com recursos premium, destaque patrocinado, analytics e futuras restricoes especificas para rota de caminhao.

## Stack

- `apps/web`: React + Vite + TypeScript
- `apps/mobile`: Expo + React Native + TypeScript
- `apps/api`: Node.js + Express + TypeScript
- `packages/types`: contratos compartilhados
- `packages/utils`: utilitarios compartilhados
- `packages/ui`: base visual reutilizavel
- `infra/db`: SQL, migrations e seeds compativeis com Supabase Postgres + PostGIS

## Funcionalidades cobertas na base

- Perfis `motorista`, `parceiro` e `administrador`
- REST API inicial para `auth`, `users`, `categories`, `places`, `reviews`, `favorites` e `routes`
- Web com login, dashboard admin, dashboard parceiro, listagem, formulario e mapa com pins
- Mobile com home em mapa, busca, detalhe do ponto, rota, perfil e favoritos
- SQL inicial com tabelas, relacionamentos, indices, lat/lng, `geography` e historico de rotas
- Seeds para categorias iniciais
- Mocks de desenvolvimento para acelerar o MVP
- Integracao inicial com `openrouteservice`
- Preparacao para `Supabase Storage` e recursos premium futuros

## Estrutura

```text
apps/
  api/
  mobile/
  web/
packages/
  types/
  ui/
  utils/
infra/
  db/
```

## Como rodar localmente

### 1. Instale dependencias

```bash
npm install
```

### 2. Configure os ambientes

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp apps/mobile/.env.example apps/mobile/.env
```

Preencha ao menos:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`
- `OPENROUTESERVICE_API_KEY`

### 3. Configure o banco no Supabase

1. Crie um projeto no Supabase.
2. Abra o SQL Editor.
3. Execute `infra/db/migrations/001_initial_schema.sql`.
4. Execute `infra/db/seeds/001_seed_categories.sql`.
5. Opcionalmente crie um bucket para fotos de estabelecimentos.

### 4. Rode a API

```bash
npm run dev -w apps/api
```

A API sobe em `http://localhost:3333/api`.

### 5. Rode o web

```bash
npm run dev -w apps/web
```

A aplicacao web sobe em `http://localhost:3000`.

### 6. Rode o mobile

```bash
npm run dev -w apps/mobile
```

Abra no Expo Go, Android Studio ou Xcode.

## Credenciais mockadas

- Motorista: `motorista@guia.com` / `123456`
- Parceiro: `parceiro@guia.com` / `123456`
- Admin: `admin@guia.com` / `123456`

## Endpoints iniciais

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users/me`
- `GET /api/users`
- `GET /api/categories`
- `GET /api/places`
- `GET /api/places/nearby`
- `GET /api/places/:id`
- `POST /api/places`
- `PUT /api/places/:id`
- `POST /api/reviews`
- `GET /api/favorites`
- `POST /api/favorites`
- `DELETE /api/favorites/:placeId`
- `POST /api/routes/calculate`

## Regras de negocio refletidas na base

- Apenas estabelecimentos aprovados aparecem publicamente
- Parceiros so editam os proprios estabelecimentos
- Admin pode listar usuarios e atuar na moderacao
- Motorista autenticado pode avaliar e favoritar
- Favoritos possuem constraint unica
- Rota ja retorna pontos proximos com distancia ate a geometria

## Evolucao futura preparada

- Planos premium e destaque patrocinado
- Restricoes de rota por tipo de caminhao, altura, peso e eixo
- Upload real de imagens para Supabase Storage
- Repositories reais para leitura e escrita no Supabase
- RLS, observabilidade e analytics avancados
- Geocoding com Nominatim e busca textual real

## Observacoes de implementacao

- Assumi `Supabase` como banco gerenciado, mantendo a API Node com JWT proprio.
- Os dados mockados permitem usar web e mobile antes da conexao completa com o banco.
- A integracao com `openrouteservice` faz fallback para mock quando nao houver chave ou houver erro na chamada.
