import React, {type PropsWithChildren} from 'react';
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

const App = () => {
  return (
    <Provider store={store}>
        <HomeScreen />
    </Provider>
    
  );
};

const styles = StyleSheet.create({
});

export default App;
