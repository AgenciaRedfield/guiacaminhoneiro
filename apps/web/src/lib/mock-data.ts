import type { Category, DashboardMetric, Place } from "@guia/types";

export const mockCategories: Category[] = [
  { id: "cat-1", name: "Posto", slug: "posto", icon: "fuel" },
  { id: "cat-2", name: "Oficina", slug: "oficina", icon: "wrench" },
  { id: "cat-3", name: "Restaurante", slug: "restaurante", icon: "utensils" },
  { id: "cat-4", name: "Ponto de apoio", slug: "ponto-de-apoio", icon: "truck" },
];

export const mockPlaces: Place[] = [
  {
    id: "plc-1",
    ownerId: "usr-partner-1",
    categoryId: "cat-1",
    name: "Posto Serra Azul",
    description: "Diesel, patio vigiado, banho e conveniencia 24h.",
    approved: true,
    featured: true,
    acceptsLargeTruck: true,
    acceptsTrailer: true,
    acceptsBitrem: true,
    phone: "11940000001",
    whatsapp: "11940000001",
    address: "BR-116, Km 224",
    city: "Guarulhos",
    state: "SP",
    latitude: -23.457,
    longitude: -46.533,
    rating: 4.7,
    reviewsCount: 18,
    services: [
      { id: "svc-1", placeId: "plc-1", name: "Banho" },
      { id: "svc-2", placeId: "plc-1", name: "Patio seguro" }
    ],
    photos: [
      { id: "pho-1", placeId: "plc-1", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70", isCover: true }
    ],
    openingHours: ["Seg-Dom 24h"],
    distanceFromRouteKm: 1.2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "plc-2",
    ownerId: "usr-partner-1",
    categoryId: "cat-2",
    name: "Oficina Diesel Norte",
    description: "Suspensao, freio e socorro rapido para pesados.",
    approved: true,
    featured: false,
    acceptsLargeTruck: true,
    acceptsTrailer: true,
    acceptsBitrem: false,
    phone: "11940000002",
    whatsapp: "11940000002",
    address: "Avenida dos Transportes, 800",
    city: "Campinas",
    state: "SP",
    latitude: -22.905,
    longitude: -47.061,
    rating: 4.5,
    reviewsCount: 10,
    services: [
      { id: "svc-3", placeId: "plc-2", name: "Mecanica diesel" }
    ],
    photos: [
      { id: "pho-2", placeId: "plc-2", url: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c", isCover: true }
    ],
    openingHours: ["Seg-Sab 06:00-22:00"],
    distanceFromRouteKm: 3.8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const adminMetrics: DashboardMetric[] = [
  { label: "Estabelecimentos ativos", value: 184, helper: "+12 esta semana" },
  { label: "Cadastros pendentes", value: 14, helper: "Precisam de aprovacao" },
  { label: "Avaliacoes moderadas", value: 87, helper: "Ultimos 30 dias" },
  { label: "Parceiros premium", value: 9, helper: "Pronto para evoluir" },
];

export const partnerMetrics: DashboardMetric[] = [
  { label: "Visualizacoes", value: 1234, helper: "Ultimos 30 dias" },
  { label: "Cliques no WhatsApp", value: 164, helper: "Taxa de interesse boa" },
  { label: "Favoritos", value: 48, helper: "Motoristas recorrentes" },
  { label: "Nota media", value: 4.7, helper: "18 avaliacoes" },
];
