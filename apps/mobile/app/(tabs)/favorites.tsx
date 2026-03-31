import { View, Text, StyleSheet } from "react-native";
import { mobilePlaces } from "../../lib/mock-data";

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      {mobilePlaces.map((place) => (
        <View key={place.id} style={styles.card}>
          <Text style={styles.cardTitle}>{place.name}</Text>
          <Text style={styles.cardText}>{place.city}/{place.state}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f1e3", padding: 20, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: "700", color: "#1f2937", marginBottom: 16 },
  card: { backgroundColor: "white", borderRadius: 18, padding: 16, marginBottom: 12 },
  cardTitle: { fontWeight: "700", color: "#1f2937", fontSize: 16 },
  cardText: { color: "#5b6472", marginTop: 6 },
});
