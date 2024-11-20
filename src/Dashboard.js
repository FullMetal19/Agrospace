import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Color } from '../config/Color';

import Header from '../components/Header';
import { TopBar } from '../components/TopBar';
import CircularProgress from 'react-native-circular-progress-indicator';
import { BarChart } from "react-native-gifted-charts";
import { getSpeculations } from '../config/Modal';
import { rdb } from "../config/DB";
import { ref, get, child } from 'firebase/database';



export default function Dashboard({ navigation }) {

  const [data , setData] = useState([]);
  const [specs , setSpecs] = useState([]);
  const [nbspecs , setNbspecs] = useState();
  const [nbdevice , setNbdevice] = useState();
  const [nbofdeviceinActiviy , setNbofdeviceinActiviy] = useState();
  const [pid, setPid] = useState(null);

  const fetchPid = async () => {
    try {
        const savedPid = await AsyncStorage.getItem('pid');
        if (savedPid) setPid(JSON.parse(savedPid));
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const fetchSpeculation = async () => {      
    const data = await getSpeculations({ pid })
    setNbspecs( data.length )
    setSpecs( data )
    let value = 0
    data.map((item) => { 
        let val = item.device 
        value += val.length 
    })
    setNbdevice(value)
}


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
      const filteredDevices1 = deviceArray.filter((device) => device.pid === pid);
      const filteredDevices2 = filteredDevices1.filter((device) => device.state === 1);
      setNbofdeviceinActiviy( filteredDevices2.length );
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
};
}


const generatepNodes = (arg) => {

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');
  const curDate = `${year}-${month}-${day}`;
  let differenceInDays = 0

  return Object.keys(arg).map((key, index) => {
      const sdata = arg[key];
      console.log(sdata)
      const startAt = sdata.startAt
      const date1 = new Date(startAt);
      const date2 = new Date(curDate);
      if( date1  < date2 ) {
          const differenceInMs = Math.abs(date2 - date1);
          differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
      }  
      else differenceInDays = 0
      let dayleft = sdata.duration - differenceInDays
      console.log(dayleft)
      // return  { name: sdata.sname, jours_passés : differenceInDays, jours_restant: dayleft  }
      return  { 
        stacks: [
            {value: differenceInDays, color: Color.former },
            {value:  dayleft, color: '#F0F0F0' },
        ],
      label: sdata.sname }
  });  
};


useEffect(() => {
  fetchPid()
  fetchSpeculation();
  fetchDevices();
}, [pid, specs ]);


const ptdata = generatepNodes(specs)

  return (

    <View>

      <StatusBar backgroundColor={ Color.latter } barStyle={ 'light-content' } />
      <Header navigation={ navigation } />

      <View style={{backgroundColor:'white', padding:8}}>
        <Text style={{color:Color.latter, fontSize:16}}> Dashboard </Text>
      </View>

      <TopBar navigation={ navigation } />

      <ScrollView style={{ paddingTop:25 }}>

          <View style={{ marginHorizontal:15, marginBottom:15, flexDirection:'column', alignItems:'center', backgroundColor:'white', shadowColor:Color.dark, shadowOpacity:.8, elevation:2, paddingVertical:25, paddingHorizontal:20, borderRadius:6 }} >
              <View>
                  <CircularProgress value={ nbspecs } radius={80} duration={2000} inActiveStrokeColor={ '#F0F0F0' } activeStrokeColor={'#f39c12'} progressValueColor={ Color.latter } maxValue={30} title={'cultures'} titleColor={ Color.former } titleStyle={{ color:Color.former}} />
              </View>
          </View>
          <View style={{ marginHorizontal:15, marginBottom:15, flexDirection:'column', alignItems:'center', backgroundColor:'white', shadowColor:Color.dark, shadowOpacity:.8, elevation:2, paddingVertical:25, paddingHorizontal:20, borderRadius:6 }} >
              <View>
                  <CircularProgress value={ nbdevice } radius={80} duration={2000} inActiveStrokeColor={ '#F0F0F0' } activeStrokeColor={'#f39c12'} progressValueColor={ Color.latter } maxValue={30} title={'appareils'} titleColor={ Color.former } titleStyle={{ color:Color.former}} />
              </View>
          </View>
          <View style={{ marginHorizontal:15, marginBottom:15, flexDirection:'column', alignItems:'center', backgroundColor:'white', shadowColor:Color.dark, shadowOpacity:.8, elevation:2, paddingVertical:25, paddingHorizontal:20, borderRadius:6 }} >
              <View>
                  <CircularProgress value={ nbofdeviceinActiviy } radius={80} duration={2000} inActiveStrokeColor={ '#F0F0F0' } activeStrokeColor={'#f39c12'} progressValueColor={ Color.latter } maxValue={30} title={'app en activité'} titleColor={ Color.former } titleStyle={{ color:Color.former}} />
              </View>
          </View>

          <View style={{ marginHorizontal:10,  marginBottom:15, marginTop:20, flexDirection:'column', backgroundColor:'white', shadowColor:Color.dark, shadowOpacity:.8, elevation:2, paddingVertical:6, borderRadius:6 }} >
              
              <View style={{ paddingVertical:10, paddingHorizontal:10, borderBottomColor:Color.latter, borderBottomWidth:1, marginBottom:30 }} >
                  <Text style={{color:'gray', fontSize:18}}> Evolution des cultures </Text>
              </View>
              <View style={{ flex:1, padding:20  }}>
                  <BarChart barWidth={22} noOfSections={5}frontColor="lightgray" stackData={ ptdata } yAxisThickness={0} xAxisThickness={0} />
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
});
