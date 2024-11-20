import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image } from 'react-native';
import { Color } from '../config/Color';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  { 
    key: 1,
    title: 'Automatisation et IA générative',
    text: "L'applification simplifie les tâches répétitives et optimise les processus. Grâce à des scénarios personnalisables et des intégrations intelligentes, cette fonctionnalité permet de déclencher des actions automatiques en fonction de conditions définies.",
    image: require('../assets/img/image1.jpg'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 3,
    title: 'Stockage de données',
    text: "Avec la fonctionnalité de stockage, l'application offre un espace sécurisé et centralisé pour sauvegarder toutes les données importantes. Les utilisateurs peuvent accéder facilement à leurs données, ce service garantit la disponibilité, l'intégrité et la confidentialité des informations.",
    image:require('../assets/img/image3.png'),
    backgroundColor: 'white',
  },
  {
    key: 2,
    title: 'Monitoring et gestion de controle',
    text: "Grâce à des tableaux de bord interactifs et des notifications en direct, l'application fournit des indicateurs clés de performance, et des rapports détaillés pour garantir un contrôle optimal.",
    image: require('../assets/img/image2.jpg'),
    backgroundColor: '#febe29',
  }
];


export default function Welcome({ navigation }) 
{
  const renderItem = ({ item })=>{
    return(
    <View style={{ padding:15, flex:1 }}>
      <StatusBar backgroundColor={ Color.light } barStyle={ 'light-content' } /> 
      <Image source={ item.image } style={{ width:300, height:300, marginTop:100, alignSelf:'center' }} ></Image >
      <Text style={{ fontSize:20, color:Color.former, fontWeight:'bold', textAlign:'center', marginTop:20  }} > { item.title } </Text>
      <Text style={{ fontSize:14, color:'gray', marginTop:10, textAlign:'center', paddingHorizontal:15  }} > { item.text } </Text>
    </View>
    )
  }


  return (

    <AppIntroSlider
      data={ slides }
      renderItem={ renderItem }
      backgroundColor={ Color.light }
      activeDotStyle={{
        backgroundColor : Color.former,
        width:40
      }}
      renderDoneButton={ () => { return ( <Text style={{ color:Color.former }} > Terminer </Text> ) } }
      renderNextButton={ () => { return ( <Text style={{ color:Color.former }} > Suivant </Text> ) } }
      // renderSkipButton={ () => { return ( <Text style={{ color:Color.former }} > Retour </Text> ) } }
      onDone={ () => { navigation.navigate('Signin') } }
    >

    </AppIntroSlider>

  )
}
