import React, {useState, useEffect}  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../src/Home';
import ChatBot from '../src/ChatBot';
import Service from '../src/Service';
import Profil from '../src/Profil';

import Welcome from '../src/Welcome';
import Signin from '../src/Signin';

import Dashboard from '../src/Dashboard';
import Network from '../src/Network';
import Setting from '../src/Setting';
import Itk from '../src/Itk';
import Calender from '../src/Calender';
import Notification from '../src/Notification';


import { FontAwesome } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Color } from '../config/Color';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function Router({ navigation }) 
{
  const [item, setItem] = useState(0);

  const getState = async () => {
    const value =  await AsyncStorage.getItem('state') 
    setItem( value )
  }

  useEffect(() => { getState() }, []);

  return (
    <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false }}>  
        {
          (item === 1) ? null : ( <Stack.Screen name="first" component={WelcomeRoute} /> )
        }
            <Stack.Screen name="bottomRoute" component={BottomRoute} />
            <Stack.Screen name="PanelRoute" component={PanelRoute} />
            {/* <Stack.Screen name="Network" component={Network} /> */}

        </Stack.Navigator>
    </NavigationContainer>
  )
}


function BottomRoute({ navigation })
{
  return (
    <Tab.Navigator screenOptions={{ headerShown: false,  tabBarActiveTintColor: Color.former, tabBarInactiveTintColor: "gray", tabBarStyle: { height: 64, paddingTop: 8 }, }} >

       <Tab.Screen name="Accueil" component={Home} options={{  tabBarIcon: ({ color, size, focused }) => ( <FontAwesome name="home" size={26} color={focused ? Color.latter : 'gray'} /> ), }}/>
       <Tab.Screen name="Chatbot" component={ChatBot} options={{  tabBarIcon: ({ color, size, focused }) => ( <Ionicons name="chatbox-ellipses" size={26} color={focused ? Color.latter : 'gray'} /> ), }} />
       <Tab.Screen name="Service" component={Service} options={{  tabBarIcon: ({ color, size, focused }) => ( <MaterialIcons name="home-repair-service" size={26} color={focused ? Color.latter : 'gray'} /> ), }} />
       <Tab.Screen name="Profile" component={Profil} options={{  tabBarIcon: ({ color, size, focused }) => ( <MaterialCommunityIcons name="face-man-profile" size={26} color={focused ? Color.latter : 'gray'} /> ), }} />
    
    </Tab.Navigator>
  )
}


function WelcomeRoute()
{
  return (
    
      <Stack.Navigator screenOptions={{ headerShown: false }}>  

        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="TestRoute" component={BottomRoute} />
 
      </Stack.Navigator>
    
  )
}


function PanelRoute()
{
  return (
    
      <Stack.Navigator screenOptions={{ headerShown: false }}>  

        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Network" component={Network} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="Itk" component={Itk} />
        <Stack.Screen name="Calendar" component={Calender} />
        <Stack.Screen name="Notification" component={Notification} />

      </Stack.Navigator>

    
  )
}