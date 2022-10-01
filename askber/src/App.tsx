import React, { type PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import { store } from './store/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import MapScreen from './screens/MapScreen';
import EatsScreen from './screens/EatsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const App = () => {

  const Stack = createNativeStackNavigator();
  
  return (
    <Provider store={store}>
      <NavigationContainer>
      <SafeAreaProvider>
          <Stack.Navigator initialRouteName='HomeScreen'>
            <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown:false}}/>
            <Stack.Screen name='MapScreen' component={MapScreen} options={{headerShown:false}}/>
            <Stack.Screen name='EatsScreen' component={EatsScreen} options={{headerShown:false}}/>
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>

  );
};

const styles = StyleSheet.create({
});

export default App;


