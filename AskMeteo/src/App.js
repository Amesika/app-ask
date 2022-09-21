import React from 'react';
import About from './components/About';
import Search from './components/Search';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

function HomeStackScreen() {
 return (
   <View>
     <Text style={{textAlign: 'center', marginTop: 300}}>Home    Screen</Text>
   </View>
  );
}
function SettingsStackScreen() {
  return (
    <View>
      <Text style={{textAlign: 'center', marginTop: 300}}>Settings Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#a2273c',
            borderTopWidth: 1,
            borderColor: '3f101c'
          }
        })}
      >
        <Tab.Screen 
        name="Search2" 
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name="About" component={About} 
         options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

