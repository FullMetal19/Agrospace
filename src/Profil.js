import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Color } from '../config/Color';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserById } from '../config/Modal';

export default function Profil({ navigation }) 
{ 
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [uid, setUid] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const savedUid = await AsyncStorage.getItem('uid');
          if (savedUid) setUid(JSON.parse(savedUid));

          const docRef = await getUserById(uid)   
          setData( docRef )  
          setLoading(true)
          
        } catch (error) {
          console.error('Error retrieving data:', error);
        }
      };
  
      fetchData();
    }, [uid]);
    

  return (
    <View>
      <StatusBar backgroundColor={ Color.latter } barStyle={ 'light-content' } />
      <Header navigation={ navigation } />
      <View style={{backgroundColor:'white', padding:8, }}>
          <Text style={{color:Color.latter, fontSize:16}}> Profile </Text>
      </View>
      <ScrollView style={{ paddingTop:25 }}>

          <View style={{ marginHorizontal:15, marginBottom:25, flexDirection:'column', alignItems:'center', backgroundColor:'white', shadowColor:Color.dark, shadowOpacity:.8, elevation:2, paddingVertical:25, paddingHorizontal:20, borderRadius:6 }} >
              <View style={{ backgroundColor:Color.latter , width:120, height:120, borderRadius:90, alignItems:'center', justifyContent:'center', marginBottom:15 }} >
                  <FontAwesome name="user-circle-o" size={80} color="white" />
              </View>
              <View style={{ marginStart:4, flex:1, flexDirection:"column", alignItems:'center' }} >
                  <Text style={{ fontSize:16, color:Color.former, paddingHorizontal:5, fontWeight:'bold', marginBottom:6 }}> { loading ? ( `${data.fname} ${data.lname}` ) : null } </Text>
                  <Text style={{ fontSize:13, color:'gray',paddingHorizontal:5, textAlign:'center' }}> { loading ? data.email : null } </Text>
              </View>
          </View>

          <View style={{ flex:1, marginHorizontal:15, marginBottom:25, flexDirection:'column',  backgroundColor:'white', shadowColor:Color.dark, shadowOpacity:.8, elevation:2, paddingVertical:25, paddingHorizontal:20, borderRadius:6 }} >
              
              <View style={{ marginStart:4, flex:1, flexDirection:"column", marginBottom:10 }} >
                  <Text style={{ fontSize:11, color:Color.latter, paddingHorizontal:1, marginBottom:2 }}> Prenom : </Text>
                  <View style={{ width:'100%', flex:1, backgroundColor:Color.light, borderWidth:1, borderColor:'gray', borderRadius:6, padding:12 }}>
                      <Text style={{ fontSize:13, color:'gray',paddingHorizontal:5, }}> { loading ? data.fname : null } </Text>
                  </View>
              </View>

              <View style={{ marginStart:4, flex:1, flexDirection:"column", marginBottom:10 }} >
                  <Text style={{ fontSize:11, color:Color.latter, paddingHorizontal:1, marginBottom:2 }}> Nom : </Text>
                  <View style={{ width:'100%', flex:1, backgroundColor:Color.light, borderWidth:1, borderColor:'gray', borderRadius:6, padding:12 }}>
                      <Text style={{ fontSize:13, color:'gray',paddingHorizontal:5, }}> { loading ? data.lname : null } </Text>
                  </View>
              </View>

              <View style={{ marginStart:4, flex:1, flexDirection:"column", marginBottom:10 }} >
                  <Text style={{ fontSize:11, color:Color.latter, paddingHorizontal:1, marginBottom:2 }}> Sexe : </Text>
                  <View style={{ width:'100%', flex:1, backgroundColor:Color.light, borderWidth:1, borderColor:'gray', borderRadius:6, padding:12 }}>
                      <Text style={{ fontSize:13, color:'gray',paddingHorizontal:5, }}> { loading ? data.sex : null } </Text>
                  </View>
              </View>
              
              <View style={{ marginStart:4, flex:1, flexDirection:"column", marginBottom:10 }} >
                  <Text style={{ fontSize:11, color:Color.latter, paddingHorizontal:1, marginBottom:2 }}> Numéro de téléphone : </Text>
                  <View style={{ width:'100%', flex:1, backgroundColor:Color.light, borderWidth:1, borderColor:'gray', borderRadius:6, padding:12 }}>
                      <Text style={{ fontSize:13, color:'gray',paddingHorizontal:5, }}> { loading ? data.phone : null } </Text>
                  </View>
              </View>

          </View>

          <Text style={{ marginBottom:140 }} >  </Text>

      </ScrollView>

      <Text> HERE IS THE SERVICE PAGE </Text>
     
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
