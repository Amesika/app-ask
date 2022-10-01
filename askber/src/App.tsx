import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
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
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "height" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
            style={{ flex: 1 }}>
            <Stack.Navigator initialRouteName='HomeScreen'>
              <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name='MapScreen' component={MapScreen} options={{ headerShown: false }} />
              <Stack.Screen name='EatsScreen' component={EatsScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>

  );
};

const styles = StyleSheet.create({
});

export default App;


