import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Color } from '../config/Color';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function Header({ navigation }) 
{
  return (

    <View style={{backgroundColor:Color.latter, padding:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingTop:36}}>
        
        <TouchableOpacity onPress={ ()=>{ navigation.navigate('bottomRoute') } } > <MaterialCommunityIcons name="leaf-circle-outline" size={40} color="white" /> </TouchableOpacity>
        <Text style={{color:'white', fontSize:18}}> Agro-space </Text>
       
    </View>

  )
}