import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {useDispatch}  from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavorites from './NavFavorites';
import { Icon } from "@rneui/themed";

const NavigateCard = () => {

  const dispatch = useDispatch()
  const navigation = useNavigation()

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-2 text-xl`}>NavigateCard</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          placeholder='Where to?'
          minLength={2}
          enablePoweredByContainer={false}
          fetchDetails={true}
          onPress={(data, details = null) => {
           dispatch(setDestination({
            latitude: details?.geometry.location.lat, 
            longitude: details?.geometry.location.lng,
            description: data.description
           }))
           navigation.navigate('RideOptionsCard')
          }}
          styles={toInputBoxstyles}
          query={{
            key: 'AIzaSyA3T1EsFDM4ef7ftxoYm_yTUx4L7lEf3KM',
            language: 'fr',
          }}
        />
        </View>
        <NavFavorites />
      </View>
      <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
        <TouchableOpacity 
        onPress={() => {
          navigation.navigate('RideOptionsCard')
         }}
        style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
          <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
          <Text style={tw`text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxstyles = StyleSheet.create({
  container:{
    backgroundColor:"white",
    paddingTop: 20,
    flex:0
  },
  textInput:{
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer:{
    paddingHorizontal:20,
    paddingBottom:0
  }
})