insert into public.place_categories (name, slug, icon, description)
values
  ('Posto', 'posto', 'fuel', 'Abastecimento, conveniencia e apoio ao motorista'),
  ('Oficina', 'oficina', 'wrench', 'Mecanica e manutencao para pesados'),
  ('Borracharia', 'borracharia', 'circle-dot', 'Pneus, calibragem e reparos rapidos'),
  ('Restaurante', 'restaurante', 'utensils', 'Alimentacao na estrada'),
  ('Hotel', 'hotel', 'bed', 'Hospedagem e descanso'),
  ('Patio', 'patio', 'warehouse', 'Patio para pernoite e seguranca'),
  ('Ponto de apoio', 'ponto-de-apoio', 'truck', 'Banho, descanso e infraestrutura de apoio'),
  ('Guincho', 'guincho', 'truck-pickup', 'Socorro e remocao'),
  ('Balanca', 'balanca', 'scale-balanced', 'Controle de peso'),
  ('Loja de pecas', 'loja-de-pecas', 'boxes-stacked', 'Pecas e acessorios para linha pesada')
on conflict (slug) do update set
  name = excluded.name,
  icon = excluded.icon,
  description = excluded.description,
  updated_at = timezone('utc', now());
