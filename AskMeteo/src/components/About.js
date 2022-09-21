import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import style from "../Style";

export default class About extends React.Component {


    search(){
        this.props.navigation.navigate("Search")
    }

    render() {
        return (
            <View style={style.container}>
                <Text style={style.title}>A propos de l'application</Text>
                <Text>Exercitation adipisicing cupidatat ea minim fugiat eu veniam deserunt occaecat eiusmod. Esse culpa enim ipsum culpa consectetur nulla et mollit proident. Qui voluptate amet mollit nulla.</Text>
                <Button color={style.color} onPress={()=>this.search()} title="Recherche"/>
    </View>
        )
    }
}


