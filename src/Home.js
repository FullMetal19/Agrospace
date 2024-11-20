import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Color } from '../config/Color';
import { getProjects } from '../config/Modal';

import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Header from '../components/Header';

export default function Home({ navigation }) {

    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [uid, setUid] = useState(null);

    const handler = async ( pid ) => {
        await AsyncStorage.setItem('pid', JSON.stringify( pid ) );
        navigation.navigate('PanelRoute')
    }


    useEffect(() => {

      const fetchData = async () => {
        try {
          const savedUid = await AsyncStorage.getItem('uid');
          if (savedUid) setUid(JSON.parse(savedUid));
          const res = await getProjects(uid)

          if ( Array.isArray(res) ) { 
            setData( res )  
            setLoading(true)
          }
          else{ setLoading(false) }
          
        } catch (error) {
          console.error('Error retrieving data:', error);
        }
      };
  
      fetchData();
    },[data]);

  return (
    
    <View>
      <StatusBar backgroundColor={ Color.latter } barStyle={ 'light-content' } />
      <Header />
      <View style={{backgroundColor:'white', padding:8}}>
          <Text style={{color:Color.latter, fontSize:16}}> Accueil </Text>
      </View>

      <ScrollView style={{ }}>      

          <ScrollView style={{ flexDirection:'row', marginTop:20, paddingHorizontal:5, paddingVertical:16, marginBottom:20}} horizontal showsHorizontalScrollIndicator={false} >
        
              <View style={{ marginHorizontal:5, flexDirection:'row', alignItems:'center', backgroundColor:'white', shadowColor:Color.dark, shadowOpacity:.8, elevation:2, width:335, height:180, padding:10, borderRadius:4 }} >
                  <View style={{ flexDirection:'row', flex:1,  alignItems:'center' }} >
                      <Image source={ require('../assets/img/image1.jpg')} style={{ width:150, height:160 }} />
                  </View>
                  <View style={{ flexDirection:'column', flex:1, marginStart:4, }} >
                      <MaterialCommunityIcons name="leaf-circle-outline" size={40} color={Color.former} />
                      <Text style={{ fontSize:16, color: Color.former, marginBottom:10 }}> Agro-space </Text>
                      <Text style={{ fontSize:11, color:'gray', marginBottom:6 }}> Le systeme intégre un modele générative enrichissant l'expérience en fournissant des recommandations basées sur des analyses approfondies des données locales et globales.   </Text>
                      <Text style={{ fontSize:8, color:'gray', alignSelf:'flex-end', color:Color.former }}> Xelkom-AI </Text>
                  </View>
              </View> 

              <View style={{ marginHorizontal:5, flexDirection:'row', alignItems:'center', backgroundColor:'white', shadowColor:Color.dark, shadowOpacity:.8, elevation:2, width:335, height:180, padding:10, borderRadius:4 }} >
                  <View style={{ flexDirection:'row', flex:1,  alignItems:'center' }} >
                      <Image source={ require('../assets/img/image1.jpg')} style={{ width:150, height:160 }} />
                  </View>
                  <View style={{ flexDirection:'column', flex:1, marginStart:4, }} >
                      <MaterialCommunityIcons name="leaf-circle-outline" size={40} color={Color.former} />
                      <Text style={{ fontSize:16, color: Color.former, marginBottom:10 }}> Agro-space    </Text>
                      <Text style={{ fontSize:11, color:'gray', marginBottom:6, paddingHorizontal:1 }}> Avec l'automatisation, le systeme contrôle directement l’activité d’arrosage générer par notre IA générative. Elle ajuste les paramètres selon la zone le climat et la culture. </Text>
                      <Text style={{ fontSize:8, color:'gray', alignSelf:'flex-end', color:Color.former, paddingHorizontal:1 }}> Xelkom-AI  </Text>
                  </View>
              </View> 

          </ScrollView>

          <View style={{backgroundColor:'white', padding:10, marginBottom:25, marginHorizontal:10, borderRadius:4, shadowColor:Color.dark, shadowOpacity:.8, elevation:2, shadowOffset:{width:4, height:8}}}>
              <Text style={{color:'gray', fontSize:18}}> Liste des projets </Text>
          </View>

          {
          ( Array.isArray(data) && data.length === 0 ) ? (
          
          <View style={{backgroundColor:Color.warning, padding:20, marginBottom:25, marginHorizontal:10, borderRadius:4, shadowColor:Color.dark, shadowOpacity:.8, elevation:2, shadowOffset:{width:4, height:8}}}>
              <Text style={{color:'gray', fontSize:14}}> Vous n'avez enregistré aucun projet à votre actif. Veillez en creer un. </Text>
          </View>
          ): (

            <FlatList  data={data}  keyExtractor={(item) => item.pid} scrollEnabled={false}
                renderItem={({ item }) => (
                
                    <View style={{ backgroundColor:'white', padding:14, marginBottom:15, marginHorizontal:10, borderRadius:6, shadowColor:Color.dark, shadowOpacity:.8, elevation:2, shadowOffset:{width:4, height:8} }}>
                        <Text style={{fontSize:18, color:Color.former, marginBottom:5 }} > Projet : { item.pname } </Text>
                        <Text style={{fontSize:12, color:'gray', paddingLeft:5}} > Lieu :  { item.address } </Text>
                        <Text style={{ borderBottomColor:Color.latter, borderBottomWidth:1, marginBottom:8 }} >  </Text>
                        <View style={{ flexDirection:'row', flex:1, justifyContent:"space-between", alignItems:'center' }} >
                            <Text style={{fontSize:12, color:'gray', paddingLeft:5}} > creer le : { item.createdAt } </Text>
                            <TouchableOpacity style={{ backgroundColor:Color.former, borderRadius:2, paddingHorizontal:10, paddingVertical:4 }} onPress={ ()=>{ handler( item.pid ) } } > 
                                <Text style={{color:'white', textAlign:'center', fontSize:14}} > Plus </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                )}
            />

        )}

          <Text style={{ marginBottom:440 }} >  </Text>

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
