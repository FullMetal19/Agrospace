import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Color } from '../config/Color';
import { auth  } from '../config/DB';
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Signin({ navigation }) 
{
   const [email, setEmail] = useState()
   const [password, setPassword] = useState()
   const [response, setResponse] = useState(false)

   const handleForm = async () => {

    try {

      // console.log(email)
      // console.log(password)
      const res = await signInWithEmailAndPassword( auth, email, password);
      await AsyncStorage.setItem("uid", JSON.stringify(res.user.uid) );
      await AsyncStorage.setItem('state', JSON.stringify(1) );
      // setResponse(false)
      navigation.navigate('bottomRoute')

    } catch (error) {
        setResponse(true)
    }
} 


  return (

    <ScrollView>

      <StatusBar backgroundColor={ Color.light } barStyle={ 'light-content' } />

      <View style={{ paddingVertical:20, flexDirection:'row', justifyContent:'center' }}>
        <Image source={ require('../assets/img/image3.png')} style={{ width:140, height:140, marginTop:50 }} />
      </View>

      <Text style={{ fontSize:36, fontWeight:'bold', color:Color.light, textShadowRadius: 10, textShadowOffset: { width: 2, height: 2 }, textShadowColor: Color.dark, alignSelf:'center', marginTop: 5, padding:8 }}> Connexion </Text>
        
      {
        response ? (
          <View style={{backgroundColor:Color.warning, padding:20, marginVertical:10, marginHorizontal:20, borderRadius:4, shadowColor:Color.dark, shadowOpacity:.8, elevation:2, shadowOffset:{width:4, height:8}}}>
              <Text style={{color:'gray', fontSize:14}}> Erreur ! veillez verifier vos identifiants de connexion. </Text>
          </View>
        ) : null
      }

      <View style={{ flexDirection:'column', justifyContent:'center', marginTop: 10, paddingHorizontal:24, }} >   
     
        <Text style={{ fontSize:12, color:'gray', marginBottom:4 }}> Email  </Text>
        <TextInput placeholder='example@gmail.com' style={{ width:'100%', paddingVertical:8, paddingHorizontal:16, borderWidth:1, borderRadius:6, borderColor:'#D3D3D3', marginBottom:15 }} onChangeText={ setEmail } />

        <Text style={{ fontSize:12, color:'gray', marginBottom:4 }}> Mot de passe </Text>
        <TextInput placeholder='mot de passe' secureTextEntry style={{ width:'100%', paddingVertical:8, paddingHorizontal:16, borderWidth:1, borderRadius:6, borderColor:'#D3D3D3', marginBottom:25 }} onChangeText={ setPassword } />

        <TouchableOpacity style={{ marginBottom:30 }}>
          <Text style={{ color:Color.latter, fontSize:14 }}> Mot de passe oublié ? </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor:Color.former, borderRadius:8, padding:10, }} onPress={  handleForm  } > 
          <Text style={{color:'white', textAlign:'center', fontSize:18}} > Se-connecter </Text>
        </TouchableOpacity>

      </View>

      <Text style={{ fontSize:14, color:'gray', marginLeft:20, marginTop:40, }}> Copyright scoopadai 2024 </Text>

    </ScrollView>
    
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        height:'100%'
    },
    shadowText: {
      fontSize: 24,
      color: "black",
      textShadowColor: Color.former, // Shadow color
      textShadowOffset: { width: 2, height: 2 }, // Shadow offset (x and y)
      textShadowRadius: 3, // Shadow blur radius
    }
})