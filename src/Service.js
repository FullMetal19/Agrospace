import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Color } from '../config/Color';


import Header from '../components/Header';

export default function Service({ navigation }) {
  return (
    <View>
      <StatusBar backgroundColor={ Color.latter } barStyle={ 'light-content' } />
      <Header navigation={ navigation } />
      <View style={{backgroundColor:'white', padding:8, }}>
          <Text style={{color:Color.latter, fontSize:16}}> Service </Text>
      </View>
      <ScrollView style={{ paddingTop:25 }}>

          <View style={{ marginHorizontal:15, marginBottom:25, flexDirection:'column', alignItems:'center', backgroundColor:'white', shadowColor:Color.dark, shadowOpacity:.8, elevation:2, paddingVertical:25, paddingHorizontal:20, borderRadius:6 }} >
              <View style={{ backgroundColor:Color.warning, width:90, height:90, borderRadius:90, alignItems:'center', justifyContent:'center', marginBottom:15 }} >
                  <Image source={ require('../assets/img/image3.png')} style={{ width:50, height:50, borderRadius:12 }} />
              </View>
              <View style={{ marginStart:4, flex:1, flexDirection:"column", alignItems:'center' }} >
                  <Text style={{ fontSize:16, color:Color.former, paddingHorizontal:5, fontWeight:'bold', marginBottom:6 }}> lorem lorem lorem lorem  </Text>
                  <Text style={{ fontSize:13, color:'gray',paddingHorizontal:5, textAlign:'center' }}> lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem </Text>
              </View>
          </View>

          <View style={{ marginHorizontal:15, marginBottom:25, flexDirection:'column', alignItems:'center', backgroundColor:'white', shadowColor:Color.dark, shadowOpacity:.8, elevation:2, paddingVertical:25, paddingHorizontal:20, borderRadius:6 }} >
              <View style={{ backgroundColor:Color.warning, width:90, height:90, borderRadius:90, alignItems:'center', justifyContent:'center', marginBottom:15 }} >
                  <Image source={ require('../assets/img/image3.png')} style={{ width:50, height:50, borderRadius:12 }} />
              </View>
              <View style={{ marginStart:4, flex:1, flexDirection:"column", alignItems:'center' }} >
                  <Text style={{ fontSize:16, color:Color.former, paddingHorizontal:5, fontWeight:'bold', marginBottom:6 }}> lorem lorem lorem lorem  </Text>
                  <Text style={{ fontSize:13, color:'gray',paddingHorizontal:5, textAlign:'center' }}> lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem </Text>
              </View>
          </View>

          <View style={{ marginHorizontal:15, marginBottom:25, flexDirection:'column', alignItems:'center', backgroundColor:'white', shadowColor:Color.dark, shadowOpacity:.8, elevation:2, paddingVertical:25, paddingHorizontal:20, borderRadius:6 }} >
              <View style={{ backgroundColor:Color.warning, width:90, height:90, borderRadius:90, alignItems:'center', justifyContent:'center', marginBottom:15 }} >
                  <Image source={ require('../assets/img/image3.png')} style={{ width:50, height:50, borderRadius:12 }} />
              </View>
              <View style={{ marginStart:4, flex:1, flexDirection:"column", alignItems:'center' }} >
                  <Text style={{ fontSize:16, color:Color.former, paddingHorizontal:5, fontWeight:'bold', marginBottom:6 }}> lorem lorem lorem lorem  </Text>
                  <Text style={{ fontSize:13, color:'gray',paddingHorizontal:5, textAlign:'center' }}> lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem </Text>
              </View>
          </View>

          <View style={{ marginHorizontal:15, marginBottom:25, flexDirection:'column', alignItems:'center', backgroundColor:'white', shadowColor:Color.dark, shadowOpacity:.8, elevation:2, paddingVertical:25, paddingHorizontal:20, borderRadius:6 }} >
              <View style={{ backgroundColor:Color.warning, width:90, height:90, borderRadius:90, alignItems:'center', justifyContent:'center', marginBottom:15 }} >
                  <Image source={ require('../assets/img/image3.png')} style={{ width:50, height:50, borderRadius:12 }} />
              </View>
              <View style={{ marginStart:4, flex:1, flexDirection:"column", alignItems:'center' }} >
                  <Text style={{ fontSize:16, color:Color.former, paddingHorizontal:5, fontWeight:'bold', marginBottom:6 }}> lorem lorem lorem lorem  </Text>
                  <Text style={{ fontSize:13, color:'gray',paddingHorizontal:5, textAlign:'center' }}> lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem </Text>
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
