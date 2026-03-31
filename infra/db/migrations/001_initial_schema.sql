create extension if not exists postgis;
create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  role text not null check (role in ('driver', 'partner', 'admin')),
  name text not null,
  email text not null unique,
  phone text,
  password_hash text not null,
  avatar_url text,
  is_active boolean not null default true,
  premium_until timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.place_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  icon text not null,
  description text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.places (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.users(id) on delete cascade,
  category_id uuid not null references public.place_categories(id),
  name text not null,
  description text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  featured boolean not null default false,
  accepts_large_truck boolean not null default true,
  accepts_trailer boolean not null default false,
  accepts_bitrem boolean not null default false,
  phone text,
  whatsapp text,
  address text not null,
  city text not null,
  state text not null,
  zip_code text,
  latitude numeric(10,7) not null,
  longitude numeric(10,7) not null,
  location geography(point, 4326) generated always as (st_setsrid(st_makepoint(longitude, latitude), 4326)::geography) stored,
  rating numeric(3,2) not null default 0,
  reviews_count integer not null default 0,
  opening_hours jsonb not null default '[]'::jsonb,
  view_count integer not null default 0,
  sponsored_until timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.place_services (
  id uuid primary key default gen_random_uuid(),
  place_id uuid not null references public.places(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.place_photos (
  id uuid primary key default gen_random_uuid(),
  place_id uuid not null references public.places(id) on delete cascade,
  storage_provider text not null default 'supabase-storage',
  storage_path text not null,
  public_url text not null,
  is_cover boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  place_id uuid not null references public.places(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text,
  status text not null default 'approved' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (place_id, user_id)
);

create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  place_id uuid not null references public.places(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (place_id, user_id)
);

create table if not exists public.routes_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  origin_label text not null,
  destination_label text not null,
  origin_latitude numeric(10,7) not null,
  origin_longitude numeric(10,7) not null,
  destination_latitude numeric(10,7) not null,
  destination_longitude numeric(10,7) not null,
  route_geometry geometry(linestring, 4326),
  route_distance_km numeric(10,2) not null default 0,
  route_duration_minutes integer not null default 0,
  truck_profile text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.route_place_views (
  id uuid primary key default gen_random_uuid(),
  route_history_id uuid not null references public.routes_history(id) on delete cascade,
  place_id uuid not null references public.places(id) on delete cascade,
  distance_from_route_km numeric(8,2) not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (route_history_id, place_id)
);

create index if not exists idx_places_owner_id on public.places(owner_id);
create index if not exists idx_places_category_id on public.places(category_id);
create index if not exists idx_places_status on public.places(status);
create index if not exists idx_places_featured on public.places(featured);
create index if not exists idx_places_location on public.places using gist(location);
create index if not exists idx_reviews_place_id on public.reviews(place_id);
create index if not exists idx_reviews_user_id on public.reviews(user_id);
create index if not exists idx_favorites_user_id on public.favorites(user_id);
create index if not exists idx_routes_history_user_id on public.routes_history(user_id);
create index if not exists idx_routes_history_geometry on public.routes_history using gist(route_geometry);
create index if not exists idx_route_place_views_route_id on public.route_place_views(route_history_id);
create index if not exists idx_place_services_place_id on public.place_services(place_id);
create index if not exists idx_place_photos_place_id on public.place_photos(place_id);

create or replace function public.refresh_place_rating(place_uuid uuid)
returns void as $$
begin
  update public.places
  set rating = coalesce((select round(avg(rating)::numeric, 2) from public.reviews where place_id = place_uuid and status = 'approved'), 0),
      reviews_count = (select count(*) from public.reviews where place_id = place_uuid and status = 'approved'),
      updated_at = timezone('utc', now())
  where id = place_uuid;
end;
$$ language plpgsql;

create or replace function public.handle_review_mutation()
returns trigger as $$
begin
  perform public.refresh_place_rating(coalesce(new.place_id, old.place_id));
  return coalesce(new, old);
end;
$$ language plpgsql;

drop trigger if exists trg_users_updated_at on public.users;
create trigger trg_users_updated_at before update on public.users for each row execute procedure public.set_updated_at();

drop trigger if exists trg_place_categories_updated_at on public.place_categories;
create trigger trg_place_categories_updated_at before update on public.place_categories for each row execute procedure public.set_updated_at();

drop trigger if exists trg_places_updated_at on public.places;
create trigger trg_places_updated_at before update on public.places for each row execute procedure public.set_updated_at();

drop trigger if exists trg_place_services_updated_at on public.place_services;
create trigger trg_place_services_updated_at before update on public.place_services for each row execute procedure public.set_updated_at();

drop trigger if exists trg_place_photos_updated_at on public.place_photos;
create trigger trg_place_photos_updated_at before update on public.place_photos for each row execute procedure public.set_updated_at();

drop trigger if exists trg_reviews_updated_at on public.reviews;
create trigger trg_reviews_updated_at before update on public.reviews for each row execute procedure public.set_updated_at();

drop trigger if exists trg_favorites_updated_at on public.favorites;
create trigger trg_favorites_updated_at before update on public.favorites for each row execute procedure public.set_updated_at();

drop trigger if exists trg_routes_history_updated_at on public.routes_history;
create trigger trg_routes_history_updated_at before update on public.routes_history for each row execute procedure public.set_updated_at();

drop trigger if exists trg_route_place_views_updated_at on public.route_place_views;
create trigger trg_route_place_views_updated_at before update on public.route_place_views for each row execute procedure public.set_updated_at();

drop trigger if exists trg_reviews_refresh_place on public.reviews;
create trigger trg_reviews_refresh_place after insert or update or delete on public.reviews for each row execute procedure public.handle_review_mutation();
