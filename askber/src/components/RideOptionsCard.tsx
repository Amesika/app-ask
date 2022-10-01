import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc';
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from '../slices/navSlice';

const data = [
  {
    id: "Askber-X-123",
    title: "AskberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn"
  },
  {
    id: "Askber-XL-456",
    title: "Askber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8"
  },
  {
    id: "Askber-LUX-789",
    title: "Askber LUX 789",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf"
  }, {
    id: "Askber-LUX-798",
    title: "Askber LUX 798",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf"
  }, {
    id: "Askber-LUX-897",
    title: "Askber LUX 897",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf"
  }
]

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {

  const navigation = useNavigation()
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation)

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NavigateCard")
          }}
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`} >Select a Ride - {travelTimeInformation?.distance.text}</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw.style("flex-row justify-between items-center px-10", (id === selected?.id) && "bg-gray-200")}>
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain"
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration.text} Travel time</Text>
            </View>
            <Text style={tw`text-xl`}>
              {
                new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR'
                }).format(
                  (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) / 100
                )
              }
            </Text>


          </TouchableOpacity>
        )}
      />

      <View style={tw`mt-auto border-t border-red-200`}>
        <TouchableOpacity disabled={!selected}
          style={tw.style("bg-black py-3 m-3", (!selected) && "bg-gray-300")}>
          <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})