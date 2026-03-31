import { View, Text, StyleSheet } from "react-native";
import { mobilePlaces } from "../../lib/mock-data";

export default function RouteScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rota</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Origem</Text>
        <Text style={styles.value}>Sao Paulo/SP</Text>
        <Text style={styles.label}>Destino</Text>
        <Text style={styles.value}>Campinas/SP</Text>
      </View>
      <Text style={styles.subtitle}>Pontos ao longo do trajeto</Text>
      {mobilePlaces.map((place) => (
        <View key={place.id} style={styles.card}>
          <Text style={styles.value}>{place.name}</Text>
          <Text style={styles.helper}>A {place.distanceFromRouteKm?.toFixed(1)} km da rota</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f1e3", padding: 20, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: "700", color: "#1f2937" },
  subtitle: { marginTop: 24, marginBottom: 12, fontSize: 18, fontWeight: "700", color: "#1f2937" },
  card: { backgroundColor: "white", borderRadius: 18, padding: 16, marginTop: 12 },
  label: { color: "#5b6472" },
  value: { fontSize: 16, fontWeight: "700", color: "#1f2937", marginTop: 6 },
  helper: { color: "#5b6472", marginTop: 6 },
});
