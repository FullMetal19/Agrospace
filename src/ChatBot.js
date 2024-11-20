import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Color } from '../config/Color';

import Header from '../components/Header';

export default function ChatBot({ navigation }) {
  return (
    <View style={{  flex: 1 }} >

        <StatusBar backgroundColor={ Color.latter } barStyle={ 'light-content' } />
        <Header navigation={ navigation }/>
        <View style={{backgroundColor:'white', padding:8}}>
          <Text style={{color:Color.latter, fontSize:16}}> ChatBot </Text>
        </View>

        <View style={{flex: 1, height:'100%', alignItems: 'center', justifyContent: 'center'}}>
            <ScrollView style={{  flex: 1, height:'100%', padding:20 }} >
                <Text style={{  textAlign:'center', color:Color.former, fontSize:18 }} > Jaari Bot  </Text>
                <Text style={{  textAlign:'center', color:'gray' }} > Bienvenue dans le ChatBot exclusive au domaine agricole  </Text>
                
                <View style={{ marginTop:20, borderWidth:1, borderColor:'gray', borderRadius:6, padding:20 }}></View>
            
            </ScrollView>
        </View>

        <View style={{ flexDirection:'row', justifyContent:'center',  bottom: 0, alignItems:'center', marginHorizontal:10, marginVertical:8 }}>
            <TextInput placeholder='votre texte ici ...' style={{ flex:1, backgroundColor:'white', color:'gray', borderRadius: 30, paddingVertical:15, paddingHorizontal:16, borderColor:Color.latter, borderWidth:1 }} />
            <TouchableOpacity style={{ padding:4 }} > 
                <MaterialCommunityIcons name="send-circle" size={50} color={ Color.former } />
            </TouchableOpacity>
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
});
