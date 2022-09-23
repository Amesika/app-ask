import React from 'react';
import HomeView from './views/HomeView/HomeView';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonDetailsView from './views/PokemonDetailsView/PokemonDetailsView';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={HomeView} options={{title:''}} />
          <Stack.Screen name="Details" component={PokemonDetailsView} options={{title: 'Characteristics of the pokemon'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
