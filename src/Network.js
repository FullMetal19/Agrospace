import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { Color } from '../config/Color';

import Header from '../components/Header';
import { TopBar } from '../components/TopBar';
import { rdb } from "../config/DB";
import { ref, get, child } from 'firebase/database';


export default function Network({ navigation }) {

  const [pid, setPid] = useState(null);
  const [device, setDevice] = useState([]);

  const fetchPid = async () => {
    try {
        const savedPid = await AsyncStorage.getItem('pid');
        if (savedPid) setPid(JSON.parse(savedPid));
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const fetchDevices = async () => {
    try {
      const dbRef = ref(rdb);
      const snapshot = await get(child(dbRef, 'Devices'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const deviceArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        const filteredDevices = deviceArray.filter((device) => device.pid === pid);
        setDevice(filteredDevices);

      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
  };
}


  useEffect(() => {

      fetchPid();
      fetchDevices();

    }, [device]);
  
  return (

    <View style={{ flex:1 }}>

      <StatusBar backgroundColor={ Color.latter } barStyle={ 'light-content' } />
      <Header navigation={ navigation } />

      <View style={{backgroundColor:'white', padding:8}}>
        <Text style={{color:Color.latter, fontSize:16}}> Equipement </Text>
      </View>

      <TopBar navigation={ navigation } />

      <ScrollView style={{ paddingTop:15 }}>

          

          <View style={{ marginBottom:15, marginTop:20, flexDirection:'column', backgroundColor:'white', paddingVertical:6, height:'100%' }} >

              <View style={{ paddingVertical:10, paddingHorizontal:10, borderBottomColor:Color.latter, borderBottomWidth:1, marginBottom:30 }} >
                  <Text style={{color:'gray', fontSize:18}}> Liste des équipements </Text>
              </View>
              <View style={{ flex:1, padding:10  }}>

              {
                  ( Array.isArray(device) && device.length === 0 ) ? (
          
                      <View style={{backgroundColor:Color.warning, padding:20, marginBottom:25, marginHorizontal:10, borderRadius:4, shadowColor:Color.dark, shadowOpacity:.8, elevation:2, shadowOffset:{width:4, height:8}}}>
                          <Text style={{color:'gray', fontSize:14}}> Vous n'avez enregistré aucun appareil. Veillez en ajouter un. </Text>
                      </View>
                  ): (

                  <FlatList  data={device}  keyExtractor={(item) => item.id} scrollEnabled={false}
                      renderItem={({ item }) => (
                
                        <View style={{ backgroundColor:'white', padding:14, marginBottom:15, marginHorizontal:10, borderRadius:6, shadowColor:Color.dark, shadowOpacity:.8, elevation:2, shadowOffset:{width:4, height:8} }}>
                            <View style={{ flex:1, flexDirection:'row', rowGap:2 }} > 
                                <Text style={ (item.state === 1) ? styles.start : styles.stop } > </Text>
                                <Text style={{ fontSize:16, color:'gray', marginBottom:5 }} > Device-ID : { item.id } </Text>
                            </View>
                            <Text style={{fontSize:13, color:'gray', paddingLeft:5}} > culture : { item.sname } </Text>
                        </View>

                      )}
                  />
             )}                   

              </View>

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
