import { Link } from "expo-router";
import { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { MyContext } from "./Context";

export default function Index() {
  const { loginData } = useContext(MyContext);

  return (
	// Nombre, Apellido y Username
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <Image
          source={{ uri: loginData.pfp_url }}
          style={styles.avatar}
        />
        <View style={styles.headerTextBlock}>
          <Text style={styles.nameText}>
            {loginData.firstname} {loginData.lastname}
          </Text>
          <Text style={styles.usernameText}>@{loginData.username}</Text>
        </View>
      </View>

      {/* Informacion del usuario */}
      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Información de la cuenta</Text>

        <View style={styles.row}>
          <Text style={styles.label}>ID</Text>
          <Text style={styles.value}>{loginData.id}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Correo</Text>
          <Text style={styles.value}>{loginData.email}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Créditos</Text>
          <Text style={styles.value}>{loginData.credits}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Experiencia (XP)</Text>
          <Text style={styles.value}>{loginData.xp}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Link href="/credits" asChild>
          <Text style={styles.negritas}>Creditos</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // layout general
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8", // contraste suave para legibilidad
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  // estado de carga
  loadingContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#555",
    fontWeight: "500",
  },

  // tarjeta principal del header con avatar y nombre
  headerCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",

    // sombra suave (iOS / Android)
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "#eee",
  },

  headerTextBlock: {
    marginLeft: 16,
    flexShrink: 1,
  },

  nameText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
  },

  usernameText: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },

  // tarjeta con información detallada
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginTop: 24,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  label: {
    fontSize: 15,
    color: "#555",
    fontWeight: "600",
  },

  value: {
    fontSize: 15,
    color: "#111",
    fontWeight: "500",
    maxWidth: "60%",
    textAlign: "right",
  },

  footer: {
    position: "absolute",
    bottom: 5,
    left: 75,
    right: 75,
    alignItems: "center",
    backgroundColor: "#afa",
    padding: 10,

  },

  negritas: {
    fontWeight: "bold",
    fontSize: 24,
    marginVertical: 5,
  },
});
