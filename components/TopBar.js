import { ScrollView, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { Color } from '../config/Color';


export function TopBar({ navigation }){


    return (

        <ScrollView style={{ minHeight:75, backgroundColor:'white', paddingHorizontal:8, paddingVertical:14, borderColor:Color.latter, borderTopWidth:1}} horizontal showsHorizontalScrollIndicator={false} >
        
        <TouchableOpacity style={{ backgroundColor:Color.latter, borderRadius:4, marginHorizontal:5, paddingHorizontal:10, paddingVertical:7, height:34, marginBottom:4 }} onPress={ ()=>{ navigation.navigate('Dashboard') } } > 
          <Text style={{color:'white', textAlign:'center', fontSize:14}} > Dashboard  </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor:Color.latter, borderRadius:4, marginHorizontal:5, paddingHorizontal:10, paddingVertical:7, height:34, marginBottom:4 }} onPress={ ()=>{ navigation.navigate('Calendar') } } > 
          <Text style={{color:'white', textAlign:'center', fontSize:14}} > Calendrier  </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor:Color.latter, borderRadius:4, marginHorizontal:5, paddingHorizontal:10, paddingVertical:7, height:34, marginBottom:4 }} onPress={ ()=>{ navigation.navigate('Itk') } } > 
          <Text style={{color:'white', textAlign:'center', fontSize:14}} > It-technique  </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor:Color.latter, borderRadius:4, marginHorizontal:5, paddingHorizontal:10, paddingVertical:7, height:34, marginBottom:4 }} onPress={ ()=>{ navigation.navigate('Network') } } > 
          <Text style={{color:'white', textAlign:'center', fontSize:14}} > Equipement </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor:Color.latter, borderRadius:4, marginHorizontal:5, paddingHorizontal:10, paddingVertical:7, height:34, marginBottom:4 }} onPress={ ()=>{ navigation.navigate('Notification') } } > 
          <Text style={{color:'white', textAlign:'center', fontSize:14}} > Notification </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor:Color.latter, borderRadius:4, marginLeft:5, marginRight:20,  paddingHorizontal:10, paddingVertical:7, height:34 }} onPress={ ()=>{ navigation.navigate('Setting') } } > 
          <Text style={{color:'white', textAlign:'center', fontSize:14}} > Paramettre </Text>
        </TouchableOpacity>

      </ScrollView>

    )
}