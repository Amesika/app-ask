import { Image, SafeAreaView, StyleSheet, View } from 'react-native'
import React from 'react';
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavorites from '../components/NavFavorites';

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
              latitude: details?.geometry.location.lat,
              longitude: details?.geometry.location.lng,
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
        <NavFavorites />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})