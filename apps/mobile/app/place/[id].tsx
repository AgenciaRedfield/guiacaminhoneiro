import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { mobilePlaces } from "../../lib/mock-data";

export default function PlaceDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const place = mobilePlaces.find((item) => item.id === params.id) ?? mobilePlaces[0];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: place.name }} />
      <View style={styles.card}>
        <Text style={styles.title}>{place.name}</Text>
        <Text style={styles.subtitle}>{place.description}</Text>
        <Text style={styles.meta}>{place.address}</Text>
        <Text style={styles.meta}>{place.openingHours.join(", ")}</Text>
        <Text style={styles.meta}>Nota {place.rating} • {place.reviewsCount} avaliacoes</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f1e3", padding: 20 },
  card: { backgroundColor: "white", borderRadius: 18, padding: 16, marginTop: 20 },
  title: { fontSize: 24, fontWeight: "700", color: "#1f2937" },
  subtitle: { color: "#5b6472", lineHeight: 22, marginTop: 10 },
  meta: { color: "#1f2937", marginTop: 10 },
});
