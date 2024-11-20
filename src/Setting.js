import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { Color } from '../config/Color';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import { TopBar } from '../components/TopBar';
import { getSpeculations , getProjectById } from '../config/Modal';
// import { ScrollView } from 'react-native-gesture-handler';


export default function Setting({ navigation }) {

    const [pid, setPid] = useState(null);
    const [ data, setData ] = useState([])
    const [ project, setProject ] = useState([])
  
    const fetchPid = async () => {
      try {
          const savedPid = await AsyncStorage.getItem('pid');
          if (savedPid) setPid(JSON.parse(savedPid));
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };  

    const fetchSpeculation = async()=>{
        const res = await getSpeculations({ pid })
        setData( res )
    } 

    const fetchProject = async ()=>{
        const data = await getProjectById( pid )
        setProject( data )
        console.log(project)
    }

    useEffect( ()=>{ 

        fetchPid()
        fetchSpeculation()  
        fetchProject()

    }, [data, project] );
  
  return (

    <View style={{ flex:1 }}>

      <StatusBar backgroundColor={ Color.latter } barStyle={ 'light-content' } />
      <Header navigation={ navigation } />

      <View style={{backgroundColor:'white', padding:8}}>
        <Text style={{color:Color.latter, fontSize:16}}> Paramettre </Text>
      </View>

      <TopBar navigation={ navigation } />

      <ScrollView style={{ paddingTop:10 }}>

      <View style={{ marginBottom:15, height:400,  marginTop:20, flexDirection:'column', backgroundColor:'white', paddingVertical:6,}} >

            <View style={{ paddingVertical:10, paddingHorizontal:10, borderBottomColor:Color.latter, borderBottomWidth:1, marginBottom:10 }} >
                <Text style={{color:'gray', fontSize:18}}> Paramettre du projet </Text>
            </View>

            { ( project !== null ) ? (

            <View style={{ flex:1, marginBottom:25, flexDirection:'column',  paddingVertical:25, paddingHorizontal:20, borderRadius:6 }} >
              
              <View style={{ marginStart:4, minHeight:60, flexDirection:"column", marginBottom:10 }} >
                  <Text style={{ fontSize:11, color:Color.latter, paddingHorizontal:1, marginBottom:2 }}> Nom du projet : </Text>
                  <View style={{ width:'100%', flex:1, backgroundColor:Color.light, borderWidth:1, borderColor:'gray', borderRadius:6, padding:12 }}>
                      <Text style={{ fontSize:13, color:'gray',paddingHorizontal:5, }}> { project.pname } </Text>
                  </View>
              </View>

              <View style={{ marginStart:4, minHeight:60, flexDirection:"column", marginBottom:10 }} >
                  <Text style={{ fontSize:11, color:Color.latter, paddingHorizontal:1, marginBottom:2 }}> Superficie : </Text>
                  <View style={{ width:'100%', flex:1, backgroundColor:Color.light, borderWidth:1, borderColor:'gray', borderRadius:6, padding:12 }}>
                      <Text style={{ fontSize:13, color:'gray',paddingHorizontal:5, }}> { project.area } </Text>
                  </View>
              </View>

              <View style={{ marginStart:4, minHeight:60, flexDirection:"column", marginBottom:10 }} >
                  <Text style={{ fontSize:11, color:Color.latter, paddingHorizontal:1, marginBottom:2 }}> Region : </Text>
                  <View style={{ width:'100%', flex:1, backgroundColor:Color.light, borderWidth:1, borderColor:'gray', borderRadius:6, padding:12 }}>
                      <Text style={{ fontSize:13, color:'gray',paddingHorizontal:5, }}> { project.region } </Text>
                  </View>
              </View>
              
              <View style={{ marginStart:4, minHeight:60, flexDirection:"column", marginBottom:10 }} >
                  <Text style={{ fontSize:11, color:Color.latter, paddingHorizontal:1, marginBottom:2 }}> Adresse : </Text>
                  <View style={{ width:'100%', flex:1, backgroundColor:Color.light, borderWidth:1, borderColor:'gray', borderRadius:6, padding:12 }}>
                      <Text style={{ fontSize:13, color:'gray',paddingHorizontal:5, }}> { project.address } </Text>
                  </View>
              </View>

            </View> ): null 
            }
        </View>

          <View style={{ marginBottom:15,  marginTop:20, flexDirection:'column', backgroundColor:'white', paddingVertical:6, height:'auto' }} >

              <View style={{ paddingVertical:10, paddingHorizontal:10, borderBottomColor:Color.latter, borderBottomWidth:1, marginBottom:30 }} >
                  <Text style={{color:'gray', fontSize:18}}> Liste des cultures </Text>
              </View>

              <View style={{ padding:10  }}>

              {
                    ( Array.isArray(data) && data.length === 0 ) ? (
          
                        <View style={{backgroundColor:Color.warning, padding:20, marginBottom:25, marginHorizontal:10, borderRadius:4, shadowColor:Color.dark, shadowOpacity:.8, elevation:2, shadowOffset:{width:4, height:8}}}>
                            <Text style={{color:'gray', fontSize:14}}> Vous n'avez encore ajouté de culture. Veillez en ajouter une. </Text>
                        </View>
                    ): (

                    <FlatList  data={ data }  keyExtractor={(item) => item.sid} scrollEnabled={false}
                        renderItem={({ item }) => (
                
                          <View style={{ backgroundColor:'white', padding:14, marginBottom:15, marginHorizontal:10, borderRadius:6, shadowColor:Color.dark, shadowOpacity:.5, elevation:4, shadowOffset:{width:4, height:8} }}>
                              <View style={{ flex:1, flexDirection:'row', rowGap:2 }} > 
                                  <MaterialCommunityIcons name="leaf-circle-outline" size={25} color={Color.latter} />
                                  <Text style={{ fontSize:16, color:'gray', marginBottom:5 }} > Culture: { item.sname } </Text>
                              </View>
                              <Text style={{fontSize:13, color:'gray', paddingLeft:5}} > Surface : { item.area } ha </Text>
                         </View>

                        )}
                    />
                )}                  
             </View>

          </View>

          <Text style={{ marginBottom:240 }} >  </Text>
      
      </ScrollView >

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }

});
