import { Endpoints } from "@/constants/Endpoints";
import * as Crypto from 'expo-crypto';
import { useFonts } from "expo-font";
import { Link, router } from "expo-router";
import { useContext, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { MyContext } from "./Context";
import IconRobot from './robot';

/*
	Aplicación para demostrar la implementación de una pantalla de login usando fetch y una API que espera FormData.

	Recursos de Aprendizaje:
		https://docs.expo.dev/develop/user-interface/fonts/
		https://reactsvgicons.com/react-svg-icons-guide
		https://docs.expo.dev/router/introduction/
		https://docs.expo.dev/router/navigating-pages/
		https://react.dev/learn/passing-data-deeply-with-context
*/

export default function Index() {

	const [loaded, error] = useFonts({
		'poppins': require('../assets/fonts/PoppinsSemiBold.ttf'),
	  });
	const [userValue, setUserValue] = useState('');
	const [passValue, setPassValue] = useState('');
	const [failedLogin, setFailedLogin]= useState(false);
	const {loginData, setLoginData}=useContext(MyContext);

	const onButtonLogin = async ()=>
	{
		console.log('logging in!');
		//hacer la peticion de login
		//console.log(Endpoints.LOGIN);
		const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256,
			passValue);

		const form = new FormData();
		form.append('token','code37');  //la API espera una llave cuyo valor es arbitrariamente code37
		form.append('user',userValue);
		form.append('pass', digest);

		fetch( Endpoints.LOGIN , {
			method:'POST',
			body:form
		})
		.then( response=>response.json())
		.then( data => {console.log(data) 
			if(!data.error && data.id)
			{
				setLoginData(data);
				router.replace('/mainmenu');
			}
			else
			{
				setFailedLogin(true);
			}
		})
		.catch( err=>{console.log(err)});
	}

	const onButtonRegister = async ()=>
	{
		console.log('Por implementar :)');
	}

  return (
    <View style={styles.container}>
      {/* Reemplazamos el IconRocket por la imagen PNG local */}
      <Image
        source={require('../assets/images/LC.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>LC Apps</Text>
      <Text style={styles.subtitle}>¡Bienvenido/a!</Text>

      <View style={styles.inputfieldlabel}>
        <Text>Usuario</Text>
        <TextInput style={styles.input} onChangeText={setUserValue} />
      </View>

      <View style={styles.inputfieldlabel}>
        <Text>Contraseña</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassValue}
          secureTextEntry
        />
      </View>

      {failedLogin ? (
        <Text style={styles.error}>Credenciales Invalidas</Text>
      ) : undefined}

      <Pressable style={styles.botonconlogo} onPress={onButtonLogin}>
        <IconRobot width="32" height="32" />
        <Text>Log in!</Text>
      </Pressable>

      <Text style={{ fontWeight: 'bold' }}>¿No estas registrado?</Text>

      <Pressable style={styles.botonconlogo} onPress={onButtonRegister}>
        <IconRobot width="32" height="32" />
        <Text>Regístrate</Text>
      </Pressable>

      <View style={styles.footer}>
        <Link href="/credits" asChild>
          <Text style={styles.negritas}>Creditos</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontFamily: "poppins",
    fontSize: 44,
  },
  subtitle: {
    fontFamily: "poppins",
    fontSize: 18,
    marginVertical: 10,
  },
  inputfieldlabel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "60%",
  },
  input: {
    height: 40,
    width: 150,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  botonconlogo: {
    backgroundColor: "#2196F3",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    borderColor: "#000",
    borderWidth: 2,
    width: 150,
    marginVertical: 10,
    justifyContent: "flex-start",
    gap: 10,
  },
  error: {
    fontWeight: "bold",
    padding: 10,
    fontSize: 24,
    color: "#F22",
  },
  footer: {
    position: "absolute",
    bottom: 5,
    backgroundColor: "#afa",
    padding: 10,
  },
  negritas: {
    fontWeight: "bold",
    fontSize: 24,
    marginVertical: 5,
  },
});