import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { Icon } from "@rneui/themed";

const data = [
  {
      id: "123",
      title: "Get a ride",
      image: "https://links.papareact.com/3pn",
      screen: "MapScreen"
  },
  {
      id: "456",
      title: "Order food",
      image: "https://links.papareact.com/28w",
      screen: "EatsScreen"
  }
]

const NavOptions = () => {

  const navigation = useNavigation()

  return (
    <FlatList
            horizontal
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    onPress={()=>navigation.navigate(item.screen)}
                    style={tw`p-1 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}>
                    <View>
                        <Image
                            style={{
                                height: 100,
                                width: 100,
                                resizeMode: "contain"
                            }}
                            source={{
                                uri: item.image
                            }}
                        />
                        <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                        <Icon
                        style={tw`p-2 bg-black rounded-full w-10 mt-4`} 
                        name="arrowright" color="white" type="antdesign" />
                    </View>
                </TouchableOpacity>
            )}
        />
  )
}

export default NavOptions

const styles = StyleSheet.create({})