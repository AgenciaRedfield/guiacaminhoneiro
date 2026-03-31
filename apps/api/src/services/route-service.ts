import { env } from "../config/env.js";
import { mockRoute } from "../data/mock/mock-data.js";

export class RouteService {
  async calculate(input: {
    origin: [number, number];
    destination: [number, number];
  }) {
    if (!env.OPENROUTESERVICE_API_KEY) {
      return { ...mockRoute, provider: "mock" };
    }

    const response = await fetch("https://api.openrouteservice.org/v2/directions/driving-hgv/geojson", {
      method: "POST",
      headers: {
        Authorization: env.OPENROUTESERVICE_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coordinates: [input.origin, input.destination],
      }),
    });

    if (!response.ok) {
      return { ...mockRoute, provider: "fallback-mock" };
    }

    const data = await response.json();
    const feature = data.features?.[0];
    const summary = feature?.properties?.summary;
    const geometry = feature?.geometry?.coordinates ?? mockRoute.geometry;

    return {
      distanceKm: Number(((summary?.distance ?? mockRoute.distanceKm * 1000) / 1000).toFixed(1)),
      durationMinutes: Math.round((summary?.duration ?? mockRoute.durationMinutes * 60) / 60),
      geometry,
      stopsAlongRoute: mockRoute.stopsAlongRoute,
      provider: "openrouteservice",
    };
  }
}
