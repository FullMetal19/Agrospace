import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Color } from '../config/Color';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { rdb } from "../config/DB";
import { ref, get } from 'firebase/database';


import Header from '../components/Header';
import { TopBar } from '../components/TopBar';


export default function Notification({ navigation }) {

  const [mdata, setmData] = useState([]);
  const [adata, setaData] = useState([]);

  const [state1, setState1] = useState(0)
  const [state2, setState2] = useState(0)

  const [pid, setPid] = useState(null);
  
  const fetchPid = async () => {
      try {
          const savedPid = await AsyncStorage.getItem('pid');
          if (savedPid) setPid(JSON.parse(savedPid));
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
  };

  const findAllNotif = async ()=>{
    try {
        const path =  "Notifications/" + pid ;
        const documentRef = ref(rdb, path); 
        const snapshot = await get(documentRef);            
        if (snapshot.exists()) {

            const dataArray1 = Object.keys(snapshot.val().morning).map((did) => ({
                did,
                ...snapshot.val().morning[did],
            }));
            setmData(dataArray1);
            console.log( mdata )

            const dataArray2 = Object.keys(snapshot.val().afternoon).map((did) => ({
                did,
                ...snapshot.val().afternoon[did],
            }));
            console.log(dataArray2 )
            setaData(dataArray2);

        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
    }
}

useEffect(() => { 
  
  fetchPid()
  findAllNotif() 

}, [mdata, pid])

  
  return (

    <View style={{ flex:1 }}>

      <StatusBar backgroundColor={ Color.latter } barStyle={ 'light-content' } />
      <Header navigation={ navigation } />

      <View style={{backgroundColor:'white', padding:8}}>
        <Text style={{color:Color.latter, fontSize:16}}> Notification </Text>
      </View>

      <TopBar navigation={ navigation } />

      <ScrollView style={{ paddingTop:15, height:'100%' }}>

    
           <View style={{ marginBottom:15, flexDirection:'column', paddingVertical:6 }} >

               
                <View style={{ padding:10  }}>
                    <TouchableOpacity onPress={ ()=>{ setState1(!state1) } } >
                        <View style={{ backgroundColor:Color.latter, minHeight:62, padding:14, marginBottom:10, marginHorizontal:5, borderRadius:6, shadowColor:Color.dark, shadowOpacity:.5, elevation:4, shadowOffset:{width:4, height:8} }}>
                            <View style={{ flex:1, flexDirection:'row', rowGap:2 }} > 
                                <MaterialCommunityIcons name="leaf-circle-outline" size={25} color={'white'} />
                                <Text style={{ fontSize:16, color:'white', marginBottom:5 }} > Notification du jour </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {
                    state1 ? (

                      <View style={{}}>

                        {
                            ( Array.isArray(mdata) && mdata.length === 0 ) ? 
                            (
                              <View style={{backgroundColor:Color.warning, padding:20, marginBottom:25, marginHorizontal:10, borderRadius:4, shadowColor:Color.dark, shadowOpacity:.8, elevation:2, shadowOffset:{width:4, height:8}}}>
                                  <Text style={{color:'gray', fontSize:14}}> Pas de message reçu.  </Text>
                              </View>
                            ) : 
                            (

                              <FlatList  data={mdata}  keyExtractor={(item) => item.did }  scrollEnabled={false}
                                  renderItem={({ item }) => (
                                      
                                     <View style={{ borderWidth:1, backgroundColor:'white', borderColor:'gray', borderRadius:6, padding:20, marginHorizontal:10, marginBottom:8 }}>
                                          <Text style={{ fontSize:15, color:Color.former, marginBottom:5 }} > { item.sname } </Text>
                                          <Text style={{ fontSize:13, color:'gray', marginBottom:5 }} > { item.message } </Text>
                                          <Text style={{ fontSize:10, color:Color.former, marginBottom:5, textAlign:'right' }} > { item.createdAt } </Text>
                                     </View>

                                  )}
                              />
        
                            ) 
                        }
                                   
                      </View> 
                      
                    )   : null
                    
                    }

                </View>

                <View style={{ padding:10  }}>
                    <TouchableOpacity onPress={ ()=>{ setState2(!state2) } } >
                        <View style={{ backgroundColor:Color.latter, padding:14, minHeight:62, marginBottom:10, marginHorizontal:5, borderRadius:6, shadowColor:Color.dark, shadowOpacity:.5, elevation:4, shadowOffset:{width:4, height:8} }}>
                            <View style={{ flex:1, flexDirection:'row', rowGap:2 }} > 
                                <MaterialCommunityIcons name="leaf-circle-outline" size={25} color={'white'} />
                                <Text style={{ fontSize:16, color:'white', marginBottom:5 }} > Notification du soir </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    

                    {
                    state2 ? (

                      <View style={{}}>

                        {
                            ( Array.isArray(adata) && adata.length === 0 ) ? 
                            (
                              <View style={{backgroundColor:Color.warning, padding:20, marginBottom:25, marginHorizontal:10, borderRadius:4, shadowColor:Color.dark, shadowOpacity:.8, elevation:2, shadowOffset:{width:4, height:8}}}>
                                  <Text style={{color:'gray', fontSize:14}}> Pas de message reçu.  </Text>
                              </View>
                            ) : 
                            (

                              <FlatList  data={adata}  keyExtractor={(item) => item.did } scrollEnabled={false}
                                  renderItem={({ item }) => (
                                      
                                     <View style={{ borderWidth:1, backgroundColor:'white', borderColor:'gray', borderRadius:6, padding:20, marginHorizontal:10, marginBottom:8 }}>
                                          <Text style={{ fontSize:15, color:Color.former, marginBottom:5 }} > { item.sname } </Text>
                                          <Text style={{ fontSize:13, color:'gray', marginBottom:5 }} > { item.message } </Text>
                                          <Text style={{ fontSize:10, color:Color.former, marginBottom:5, textAlign:'right' }} > { item.createdAt } </Text>
                                     </View>

                                  )}
                              />
        
                            ) 
                        }
                                   
                      </View> 
                      
                    )   : null
                    
                    }


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
