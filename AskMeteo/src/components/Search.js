import React from "react";
import { Button, TextInput, View,Keyboard } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import style from "../Style";
import List from "./List";
import Style from "../Style";

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            city: 'Montpellier'
        }
    }

    setCity(city) {
        this.setState({ city })
    }

    submit(){
        Keyboard.dismiss()
        this.props.navigation.navigate("Meteo", {title: `Meteo - ${this.state.city}`,city: this.state.city})
    }

    render() {
        return (
            <View style={style.container}><TextInput
                underlineColorAndroid='transparent'
                onChangeText={(text) => this.setCity(text)}
                style={style.input}
                value={this.state.city}
                onSubmitEditing={() => this.submit()}
            />
                <Button color={style.color} 
                onPress={() => this.submit()} title="Rechercher une ville" />
            </View>

        )
    }
}

const Stack = createStackNavigator();

export default class StackNavigator extends React.Component{
    render(){
        return (
          <Stack.Navigator>            
            <Stack.Screen name="Search" component={Search} options={{title: "Recherche une ville", headerStyle:style.header, headerTitleStyle:Style.headerTitle}}/>
            <Stack.Screen name="Meteo" component={List} options={({route}) => ({title: route.params.title, headerStyle:style.header, headerTitleStyle:Style.headerTitle})} />
          </Stack.Navigator>
        );
      }
}