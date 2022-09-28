import React, { useState } from 'react';
import { Button, Keyboard, Text, TextInput, View } from 'react-native';
import style from "../assets/Style";
import List from "./List";



const Search = (props:any) => {
    
    const [city,setCity] = useState<string>('');

    const submit = () => {
        Keyboard.dismiss()
        props.navigation.navigate("Meteo", {title: `Meteo - ${city}`,city: city})
    }

    return(
        <View style={style.container}><TextInput
                underlineColorAndroid='transparent'
                onChangeText={(text) => setCity(text)}
                style={style.input}
                value={city}
                onSubmitEditing={() => submit()}
            />
                <Button color={style.color} 
                onPress={() => submit()} title="Rechercher une ville" />
            </View>     
    )
}

export default Search;