import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Color } from '../config/Color';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { getSpeculations, getITKById } from '../config/Modal';

import Header from '../components/Header';
import { TopBar } from '../components/TopBar';


export default function Itk({ navigation }) {

  const [isExpanded, setIsExpanded] = useState(false); 
  const [selectedItem, setSelectedItem] = useState(null); 

  const [state1, setState1] = useState(0)
  const [state2, setState2] = useState(0)
  const [state3, setState3] = useState(0)

//   const [loading, setLoading] = useState(false);
//   const [state, setState] = useState(false);

const [data, setData] = useState(null);
const [speculation, setSpeculation] = useState(null);
const [loading, setLoading] = useState(false);
const [state, setState] = useState(false);

const [pid, setPid] = useState(null);

const fetchPid = async () => {
  try {
      const savedPid = await AsyncStorage.getItem('pid');
      if (savedPid) setPid(JSON.parse(savedPid));
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};

const findAllspe = async ()=>{
    const pdata = await getSpeculations({ pid })
    setState( true )
    setSpeculation(pdata)
}

useEffect(() => {
  fetchPid() 
  findAllspe() 
}, [speculation])


const fetchData = async ( arg ) => {
  try {
      const res = await getITKById(arg)
      setData(res)
      setSelectedItem(true)
      setLoading(true);
    } catch (error) {
      console.error('Error fetching data:', error);
  }
};

  return (

    <View style={{  }}>

      <StatusBar backgroundColor={ Color.latter } barStyle={ 'light-content' } />
      <Header navigation={ navigation } />

      <View style={{backgroundColor:'white', padding:8}}>
        <Text style={{color:Color.latter, fontSize:16}}> Itineraire technique </Text>
      </View>

      <TopBar navigation={ navigation } />

        <ScrollView style={{ paddingTop:15, }}>

            <View style={{ marginHorizontal:12, }}>

                <TouchableOpacity onPress={() => setIsExpanded((prev) => !prev)} style={{ backgroundColor:'white', paddingHorizontal:20, paddingVertical:10, borderRadius:4, shadowColor:Color.dark, shadowOpacity:.5, elevation:4, shadowOffset:{width:4, height:8} }} >
                    <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                        <Text style={{color:Color.latter, fontSize:16}}> Filtrer culture </Text>
                        <Octicons name="single-select" size={24} color={Color.latter} />
                    </View>
                </TouchableOpacity>

                {/* Liste d'éléments */}
                {
                  !( Array.isArray(data) && data.length === 0 ) ? (
                
                      isExpanded && (
                        <View style={{ backgroundColor:'white', borderRadius:4 }}>
                          {speculation.map((item) => (
                            <TouchableOpacity key={item.sid} onPress={() => fetchData( item.sid ) } style={{ borderWidth:1, borderColor:'#F0F0F0', paddingHorizontal:20, paddingVertical:10 }} >
                              <Text style={{ color:'gray', fontSize:13 }}> {item.sname} </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                  ) ) :null
                } 

                {!selectedItem && (
                <View style={{backgroundColor:Color.warning, padding:20, marginVertical:20, marginHorizontal:10, borderRadius:4, shadowColor:Color.dark, shadowOpacity:.8, elevation:2, shadowOffset:{width:4, height:8}}}>
                    <Text style={{color:'gray', fontSize:14}}> Cliquez sur Filtrer pour voir l'itinéraire technique de la culture choisie </Text>
                </View>)}

                {/* Rendu pour l'élément sélectionné */}
                {selectedItem && (

                  
                  <View style={{ marginBottom:15, marginTop:20, flexDirection:'column', height:'100%' }} >

                  <View style={{ paddingVertical:10, paddingHorizontal:10, borderBottomColor:Color.latter, backgroundColor:'white', borderBottomWidth:1, marginBottom:20 }} >
                      <Text style={{color:'gray', fontSize:16}}> Culture: { data.sname } </Text>
                  </View>
                      
                  <View style={{ paddingVertical:10  }}>
                    <TouchableOpacity onPress={ ()=>{ setState1(!state1) } } >
                        <View style={{ backgroundColor:'white', minHeight:56, padding:14, marginBottom:10, borderRadius:6, shadowColor:Color.dark, shadowOpacity:.5, elevation:4, shadowOffset:{width:4, height:8} }}>
                            <View style={{ flex:1, flexDirection:'row', rowGap:2 }} > 
                                <MaterialCommunityIcons name="leaf-circle-outline" size={25} color={Color.latter} />
                                <Text style={{ fontSize:16, color:'gray', marginBottom:5 }} > Descriptions de la culture </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {
                    state1 ? (
                    <View style={{ borderWidth:1, borderColor:'gray', borderRadius:6, padding:20 }}>
                        <Text style={{ fontSize:13, color:'gray' }} > { data.desc } </Text>
                    </View>) : null
                    }
                </View>

                <View style={{ paddingVertical:10  }}>
                    <TouchableOpacity onPress={ ()=>{ setState2(!state2) } } >
                        <View style={{ backgroundColor:'white', minHeight:56, padding:14, marginBottom:10, borderRadius:6, shadowColor:Color.dark, shadowOpacity:.5, elevation:4, shadowOffset:{width:4, height:8} }}>
                            <View style={{ flex:1, flexDirection:'row', rowGap:2 }} > 
                                <MaterialCommunityIcons name="leaf-circle-outline" size={25} color={Color.latter} />
                                <Text style={{ fontSize:16, color:'gray', marginBottom:5 }} > Les fertilisants </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {
                    state2 ? (
                      <View style={{ borderWidth:1, borderColor:'gray', borderRadius:6, padding:20 }}>
                        <Text style={{ fontSize:13, color:'gray' }} > { data.fertilizer } </Text>
                      </View>) : null
                    }
                </View>

                <View style={{ paddingVertical:10  }}>
                    <TouchableOpacity onPress={ ()=>{ setState3(!state3) } } >
                        <View style={{ backgroundColor:'white', minHeight:56, padding:14, marginBottom:10, borderRadius:6, shadowColor:Color.dark, shadowOpacity:.5, elevation:4, shadowOffset:{width:4, height:8} }}>
                            <View style={{ flex:1, flexDirection:'row', rowGap:2 }} > 
                                <MaterialCommunityIcons name="leaf-circle-outline" size={25} color={Color.latter} />
                                <Text style={{ fontSize:16, color:'gray', marginBottom:5 }} > Les traitements phytosanitaires </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {
                    state3 ? (
                      <View style={{ borderWidth:1, borderColor:'gray', borderRadius:6, padding:20 }}>
                        <Text style={{ fontSize:13, color:'gray' }} > { data.phyto } </Text>
                      </View>) : null
                    }
                </View>
                    
                    
                  </View>
                )}

           </View>

           <Text style={{ marginBottom:240 }} >  </Text>
      
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  start : {
    width: 18,
    height: 18,
    borderRadius: 50,
    backgroundColor: Color.former
  },
  stop : {
    width: 18,
    height: 18,
    borderRadius: 50,
    backgroundColor: 'red'
  }

});
