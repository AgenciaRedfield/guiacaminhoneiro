import { Link } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import MapView, { Marker, UrlTile } from "react-native-maps";
import { mobilePlaces } from "../../lib/mock-data";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.badge}>Motorista</Text>
        <Text style={styles.title}>Pontos de apoio no trajeto</Text>
        <Text style={styles.subtitle}>Mapa com OpenStreetMap, geolocalizacao e locais cadastrados ao longo da rota.</Text>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: mobilePlaces[0].latitude,
          longitude: mobilePlaces[0].longitude,
          latitudeDelta: 1.5,
          longitudeDelta: 1.5,
        }}
      >
        <UrlTile urlTemplate={process.env.EXPO_PUBLIC_TILE_URL ?? "https://tile.openstreetmap.org/{z}/{x}/{y}.png"} maximumZ={19} />
        {mobilePlaces.map((place) => (
          <Marker key={place.id} coordinate={{ latitude: place.latitude, longitude: place.longitude }} title={place.name} description={place.description} />
        ))}
      </MapView>

      <View style={styles.bottomSheet}>
        {mobilePlaces.map((place) => (
          <Link key={place.id} href={`/place/${place.id}`} asChild>
            <Pressable style={styles.card}>
              <Text style={styles.cardTitle}>{place.name}</Text>
              <Text style={styles.cardText}>{place.city}/{place.state} • Nota {place.rating}</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f1e3" },
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 12 },
  badge: { alignSelf: "flex-start", backgroundColor: "#fcd9a5", color: "#92400e", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  title: { fontSize: 28, fontWeight: "700", marginTop: 12, color: "#1f2937" },
  subtitle: { marginTop: 8, color: "#5b6472", lineHeight: 22 },
  map: { flex: 1 },
  bottomSheet: { padding: 16, gap: 12, backgroundColor: "rgba(255,248,240,0.92)" },
  card: { backgroundColor: "white", borderRadius: 18, padding: 16 },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#1f2937" },
  cardText: { marginTop: 6, color: "#5b6472" },
});
