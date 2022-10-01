import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import tw from 'twrnc';

const MapScreen = () => {
  return (
    <View>
      <View style={tw`h-1/2`}><Text>TOP</Text></View>
      <View style={tw`h-1/2`}><Text>BOTTOM</Text></View>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({})