import type { Category, Favorite, Place, Review, RouteSummary, User } from "@guia/types";

const now = new Date().toISOString();

export const mockUsers: Array<User & { password: string }> = [
  {
    id: "usr-driver-1",
    name: "Carlos Estrada",
    email: "motorista@guia.com",
    role: "driver",
    phone: "11999990000",
    password: "123456",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "usr-partner-1",
    name: "Auto Posto Rodovia Sul",
    email: "parceiro@guia.com",
    role: "partner",
    phone: "11999991111",
    password: "123456",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "usr-admin-1",
    name: "Admin Guia",
    email: "admin@guia.com",
    role: "admin",
    phone: "11999992222",
    password: "123456",
    createdAt: now,
    updatedAt: now,
  },
];

export const mockCategories: Category[] = [
  { id: "cat-1", name: "Posto", slug: "posto", icon: "fuel", description: "Abastecimento e conveniencia" },
  { id: "cat-2", name: "Oficina", slug: "oficina", icon: "wrench", description: "Mecanica e manutencao" },
  { id: "cat-3", name: "Restaurante", slug: "restaurante", icon: "utensils", description: "Alimentacao na rota" },
  { id: "cat-4", name: "Ponto de apoio", slug: "ponto-de-apoio", icon: "truck", description: "Banho, descanso e apoio" },
  { id: "cat-5", name: "Borracharia", slug: "borracharia", icon: "circle-dot", description: "Pneus e socorro rapido" },
];

export const mockPlaces: Place[] = [
  {
    id: "plc-1",
    ownerId: "usr-partner-1",
    categoryId: "cat-1",
    name: "Posto Serra Azul",
    description: "Posto com diesel, banho, restaurante e patio seguro para descanso.",
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
      { id: "svc-2", placeId: "plc-1", name: "Patio vigiado" },
      { id: "svc-3", placeId: "plc-1", name: "Restaurante 24h" }
    ],
    photos: [
      { id: "pho-1", placeId: "plc-1", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70", isCover: true }
    ],
    openingHours: ["Seg-Dom 24h"],
    distanceFromRouteKm: 1.2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "plc-2",
    ownerId: "usr-partner-1",
    categoryId: "cat-2",
    name: "Oficina Diesel Norte",
    description: "Atendimento especializado em pesados, freio e suspensao.",
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
      { id: "svc-4", placeId: "plc-2", name: "Mecanica diesel" },
      { id: "svc-5", placeId: "plc-2", name: "Socorro na estrada" }
    ],
    photos: [
      { id: "pho-2", placeId: "plc-2", url: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c", isCover: true }
    ],
    openingHours: ["Seg-Sab 06:00-22:00"],
    distanceFromRouteKm: 3.8,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "plc-3",
    ownerId: "usr-partner-1",
    categoryId: "cat-4",
    name: "Ponto de Apoio Via Forte",
    description: "Lavanderia, refeitorio, wi-fi e area de descanso.",
    approved: true,
    featured: false,
    acceptsLargeTruck: true,
    acceptsTrailer: true,
    acceptsBitrem: true,
    phone: "11940000003",
    whatsapp: "11940000003",
    address: "Rodovia Anhanguera, Km 92",
    city: "Jundiai",
    state: "SP",
    latitude: -23.185,
    longitude: -46.897,
    rating: 4.8,
    reviewsCount: 25,
    services: [
      { id: "svc-6", placeId: "plc-3", name: "Dormitorio" },
      { id: "svc-7", placeId: "plc-3", name: "Banho" }
    ],
    photos: [
      { id: "pho-3", placeId: "plc-3", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", isCover: true }
    ],
    openingHours: ["Seg-Dom 24h"],
    distanceFromRouteKm: 0.6,
    createdAt: now,
    updatedAt: now,
  }
];

export const mockReviews: Review[] = [
  {
    id: "rev-1",
    placeId: "plc-1",
    userId: "usr-driver-1",
    rating: 5,
    comment: "Banho limpo e patio seguro.",
    approved: true,
    createdAt: now,
  }
];

export const mockFavorites: Favorite[] = [
  {
    id: "fav-1",
    placeId: "plc-1",
    userId: "usr-driver-1",
    createdAt: now,
  }
];

export const mockRoute: RouteSummary = {
  distanceKm: 128.4,
  durationMinutes: 142,
  geometry: [
    [-46.6333, -23.5505],
    [-46.897, -23.185],
    [-47.061, -22.905],
  ],
  stopsAlongRoute: mockPlaces.map((place) => ({
    place,
    distanceFromRouteKm: place.distanceFromRouteKm ?? 0,
  })),
};
