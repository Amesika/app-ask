import React from 'react';
import HomeView from './views/HomeView/HomeView';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonDetailsView from './views/PokemonDetailsView/PokemonDetailsView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyPokemonView from './views/MyPokemonView/MyPokemonView';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { persistStore } from "redux-persist";
import Store from './store/reducers/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import LoginView from './views/LoginView/LoginView';
import SignUpView from './views/SignUpView/SignUpView';
import ProfileView from './views/ProfileView/ProfileView';
import TestView from './views/TestView/TestView';
import PresentationView from './views/onBoarding/PresentationView';

const App = () => {

  const HomeStack = createStackNavigator();

  function HomeStackScreen() {
    return (
      <HomeStack.Navigator initialRouteName='Home'>
        <HomeStack.Screen name="Home" component={HomeView}
         options={({navigation, route}) => ({ 
          unmountInactiveRoutes: true,
          title: '', 
          headerStyle: {
            backgroundColor: '#FFF',
          },
          headerLeft: () => (
            <FontAwesome style={{ marginLeft: 15}}  name='user-circle' size={30} color={'black'} onPress={()=> navigation.navigate('Profile')} />
          ) })} 
         />
        <HomeStack.Screen name="Details" component={PokemonDetailsView} options={{ title: 'Characteristics of the pokemon' }} />
        <HomeStack.Screen name="Profile" component={ProfileView} options={{ title: 'My Profile' }} />
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

  function TabNavigation() {
    return (
      <Tab.Navigator
       initialRouteName='Presentation'
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
        <Tab.Screen name="Presentation" component={PresentationView} />
      </Tab.Navigator>
    )
  }

  const MainStack = createStackNavigator();

  function MainStackScreen() {
    return (
      <MainStack.Navigator initialRouteName={'Login'}>
        <MainStack.Screen name="Home" component={TabNavigation} options={{ headerShown: false }} />
      <MainStack.Screen name="Login" component={LoginView} options={{ headerShown: false }} />
      <MainStack.Screen name="SignUp" component={SignUpView} options={{  headerShown: false }} />
    </MainStack.Navigator>
    )
  }


  let persistor = persistStore(Store)

  return (
    <>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <MainStackScreen />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
