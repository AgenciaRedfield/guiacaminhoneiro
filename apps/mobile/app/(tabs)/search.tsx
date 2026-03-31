import { View, Text, StyleSheet, TextInput } from "react-native";
import { mobilePlaces } from "../../lib/mock-data";

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Busca</Text>
      <TextInput style={styles.input} placeholder="Buscar posto, oficina, restaurante..." />
      {mobilePlaces.map((place) => (
        <View key={place.id} style={styles.card}>
          <Text style={styles.cardTitle}>{place.name}</Text>
          <Text style={styles.cardText}>{place.description}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f1e3", padding: 20, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: "700", color: "#1f2937", marginBottom: 16 },
  input: { backgroundColor: "white", borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 20 },
  card: { backgroundColor: "white", borderRadius: 18, padding: 16, marginBottom: 12 },
  cardTitle: { fontWeight: "700", fontSize: 16, color: "#1f2937" },
  cardText: { color: "#5b6472", marginTop: 6 },
});
