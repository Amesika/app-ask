import React from 'react';
import HomeView from './views/HomeView/HomeView';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonDetailsView from './views/PokemonDetailsView/PokemonDetailsView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyPokemonView from './views/MyPokemonView/MyPokemonView';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { persistStore} from "redux-persist";
import Store from './store/reducers/configureStore';
import {PersistGate} from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';


const App = () => {

  const HomeStack = createStackNavigator();

  function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeView} options={{ title: '', headerShown: false }} />
        <HomeStack.Screen name="Details" component={PokemonDetailsView} options={{ title: 'Characteristics of the pokemon' }} />
      </HomeStack.Navigator>
    )
  }

  const MyPokemonStack = createStackNavigator();

  function MyPokemonStackScreen() {
    return (
      <MyPokemonStack.Navigator>
        <MyPokemonStack.Screen name="MyPokemon" component={MyPokemonView} options={{ title: 'My Pokemon Team' }} />
        <MyPokemonStack.Screen name="Details" component={PokemonDetailsView} options={{ title: 'Characteristics of the pokemon' }} />
      </MyPokemonStack.Navigator>
    )
  }

  const Tab = createBottomTabNavigator();

  let persistor = persistStore(Store) 

  return (
    <>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'HomeStack') {
                  return <FontAwesome name="home" size={size} color={color} />;
                } else if (route.name === 'MyPokemonStack') {
                  return <MaterialCommunityIcons name="pokeball" size={size} color={color} />;
                };
              },
              headerShown: false,
              tabBarActiveTintColor: 'rgb(200,0,0 )',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="HomeStack" component={HomeStackScreen} />
            <Tab.Screen name="MyPokemonStack" component={MyPokemonStackScreen} />
          </Tab.Navigator>
        </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
