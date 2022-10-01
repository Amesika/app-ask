import { StyleSheet, Text, View, SafeAreaView, Image, } from 'react-native'
import React, { useEffect } from 'react'
import tw from "tailwind-react-native-classnames";
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { setDestination,setOrigin } from '../slices/navSlice';
import {useDispatch}  from 'react-redux';

const HomeScreen = () => {

  const dispatch = useDispatch()

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 50,
            resizeMode: 'contain',
          }}
          source={require('../assets/images/Askber.png')}
        />
        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          placeholder='Where From?'
          minLength={2}
          enablePoweredByContainer={false}
          fetchDetails={true}
          onPress={(data, details = null) => {
           dispatch(setOrigin({
            location: details?.geometry.location,
            description: data.description
           }))

           dispatch(setDestination(null))
          }}
          styles={{
            container: {
              flex: 0
            }, textInput: {
              fontSize: 18
            }
          }}
          query={{
            key: 'AIzaSyA3T1EsFDM4ef7ftxoYm_yTUx4L7lEf3KM',
            language: 'fr',
          }}
        />
        <NavOptions />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  text: {
    color: 'blue'
  }
})