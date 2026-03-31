import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

const markerIcon = L.divIcon({
  className: "brand-marker-wrapper",
  html: `
    <div class="brand-marker-pin">
      <div class="brand-marker-core">
        <img src="/favicon.png" alt="Guia Caminhoneiro" class="brand-marker-image" />
      </div>
    </div>
  `,
  iconSize: [56, 74],
  iconAnchor: [28, 74],
  popupAnchor: [0, -66],
});

export function MapView({ places }: { places: Array<{ id: string; name: string; latitude: number; longitude: number }> }) {
  const center = places[0]
    ? ([places[0].latitude, places[0].longitude] as [number, number])
    : ([-23.55, -46.63] as [number, number]);

  return (
    <div className="panel map-box">
      <MapContainer center={center} zoom={8} style={{ height: 420, width: "100%" }} scrollWheelZoom>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url={import.meta.env.VITE_MAP_TILE_URL ?? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        />
        {places.map((place) => (
          <Marker key={place.id} position={[place.latitude, place.longitude]} icon={markerIcon}>
            <Popup>{place.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
