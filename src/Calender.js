import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Color } from '../config/Color';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { getSpeculations } from '../config/Modal';
import { rdb } from "../config/DB";
import { ref, get, child } from 'firebase/database';


import Header from '../components/Header';
import { TopBar } from '../components/TopBar';


export default function Calender({ navigation }) {

  const [isExpanded, setIsExpanded] = useState(false); // Contrôle du collapse
  const [selectedItem, setSelectedItem] = useState(null); // État pour l'élément sélectionné

//   const [loading, setLoading] = useState(false);
//   const [state, setState] = useState(false);

const [data, setData] = useState(null);
const [speculation, setSpeculation] = useState(null);
const [loading, setLoading] = useState(false);
const [state, setState] = useState(false);

const [pid, setPid] = useState(null);
const [cropname, setCropname] = useState(null);

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
      const path =  "Calendars/" + arg ;
      const documentRef = ref(rdb, path); 
      const snapshot = await get(documentRef);
      setSelectedItem(true)
      // console.log(path)
      
      if (snapshot.exists()) {

        const resp = snapshot.val().calendar
        setCropname( snapshot.val().sname )

        const dataArray = Object.keys(resp).map((date) => ({
          date,
          ...resp[date],
        }));
        
        const sortedDataArray = dataArray.sort((a, b) => {
          const dateA = new Date(a.date.split('-').reverse().join('-'));
          const dateB = new Date(b.date.split('-').reverse().join('-'));
          return dateA - dateB;
        });
        // console.log(sortedDataArray)
        setData(sortedDataArray);
        setLoading(true);
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
  }
};


  return (

    <View style={{  }}>

      <StatusBar backgroundColor={ Color.latter } barStyle={ 'light-content' } />
      <Header navigation={ navigation } />

      <View style={{backgroundColor:'white', padding:8}}>
        <Text style={{color:Color.latter, fontSize:16}}> Calendrier </Text>
      </View>

      <TopBar navigation={ navigation } />

        <View style={{ paddingTop:15, }}>

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
                    <Text style={{color:'gray', fontSize:14}}> Cliquez sur Filtrer pour voir le calendrier d'arrosage selon la culture selectionnée </Text>
                </View>)}

                {/* Rendu pour l'élément sélectionné */}
                {selectedItem && (

                  
                  <View style={{ marginBottom:15, marginTop:20, flexDirection:'column', backgroundColor:'white', height:'100%' }} >

                  <View style={{ paddingVertical:10, paddingHorizontal:10, borderBottomColor:Color.latter, backgroundColor:Color.latter, borderBottomWidth:1, marginBottom:20 }} >
                      <Text style={{color:'white', fontSize:18}}> Culture: { cropname } </Text>
                  </View>
          

                    <FlatList data={data} keyExtractor={(item) => item.date }
                        renderItem={({ item }) => (
                
                        <View style={{ backgroundColor:'white', padding:20, borderBottomColor:'#F0F0F0', borderBottomWidth:2}}>
                            <View style={{ flex:1, flexDirection:'row', rowGap:2 , alignItems:'center', marginBottom:4 }} > 
                                <MaterialCommunityIcons name="leaf-circle-outline" size={25} color={Color.latter} />
                                <Text style={{ fontSize:16, color:Color.latter, marginBottom:5 }} > Date : { item.date } </Text>
                            </View>
                            <View style={{ flex:1, flexDirection:'row', marginBottom:4, rowGap:2, backgroundColor:Color.light, borderWidth:1, borderColor:'#F0F0F0', borderRadius:6, padding:12 }} > 
                                <Text style={ (item.morning.state ===1) ? styles.start : styles.stop } > </Text>
                                <Text style={{ fontSize:13, color:'gray', alignItems:'center' }} > Arrosage matin : { item.morning.water } L - à : { item.morning.startAt } </Text>
                            </View>
                            <View style={{ flex:1, flexDirection:'row', rowGap:2, backgroundColor:Color.light, borderWidth:1, borderColor:'#F0F0F0', borderRadius:6, padding:12 }} > 
                                <Text style={ (item.morning.state ===1) ? styles.start : styles.stop } > </Text>
                                <Text style={{ fontSize:13, color:'gray', alignItems:'center' }} > Arrosage soir: { item.afternoon.water } L - à : { item.afternoon.startAt } </Text>
                            </View>
                        </View>
                    )} 
                    
                    ListFooterComponent = { <View style={{ marginBottom:440 }} >  </View> }
                    
                    />
                    
                  </View>
                )}

           </View>

           <Text style={{ marginBottom:240 }} >  </Text>
      
      </View>

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
