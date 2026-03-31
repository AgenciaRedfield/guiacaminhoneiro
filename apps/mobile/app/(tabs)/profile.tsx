import { View, Text, StyleSheet } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <View style={styles.card}>
        <Text style={styles.name}>Carlos Estrada</Text>
        <Text style={styles.helper}>Motorista</Text>
        <Text style={styles.helper}>Historico de rotas salvo pronto para evolucao.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f1e3", padding: 20, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: "700", color: "#1f2937", marginBottom: 16 },
  card: { backgroundColor: "white", borderRadius: 18, padding: 16 },
  name: { fontWeight: "700", fontSize: 18, color: "#1f2937" },
  helper: { color: "#5b6472", marginTop: 8 },
});
