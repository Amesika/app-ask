import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Search from './components/Search';
import About from './components/About';
import List from './components/List';

const Stack = createStackNavigator();

const StackNavigator = () => {
      return (
        <Stack.Navigator initialRouteName='Search'>            
          <Stack.Screen name="Search" component={Search} options={{title:'Rechercher une ville'}} />
          <Stack.Screen name="Meteo" component={List}  />
        </Stack.Navigator>
      );
      }

const Tab = createBottomTabNavigator();

function TabStack() {
  return (
    <Tab.Navigator initialRouteName='StackNavigator'
      screenOptions={() => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#a2273c',
          borderTopWidth: 1,
          borderColor: '3f101c'
        }
      })}>
      <Tab.Screen name="StackNavigator" component={StackNavigator}

        options={{
          title: 'Rechercher',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>)
}

const App = () => {
  return (
    <NavigationContainer>
      <TabStack />
    </NavigationContainer>
  );
};

export default App;
