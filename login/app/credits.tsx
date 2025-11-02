import { StyleSheet, Text, View } from "react-native";

export default function Index()
{

	return (
		<View style={styles.container}>
			<Text style={styles.titulo}>LC Apps</Text>
			<Text style={styles.nombre}>Jaime Morales Gallo</Text>
			<Text style={styles.nombre}>Eric López Arciniega</Text>
		</View>
	)
}

const styles=StyleSheet.create({
	container:{
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	titulo: {
		fontWeight: "bold",
		fontSize: 40, 
		marginBottom: 20,
 	 },
  
	nombre: {
		fontWeight: "bold",
		fontSize: 24, 
		marginVertical: 5,
  	}

});


