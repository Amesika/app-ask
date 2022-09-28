import React from 'react';
import { Button, Text, View } from 'react-native';
import style from "../assets/Style";

const About = (props: any) => {

    const search = () => {
        props.navigation.navigate("Search")
    }

    return (
        <View style={style.container}>
            <Text style={style.title}>A propos de l'application</Text>
            <Text>Exercitation adipisicing cupidatat ea minim fugiat eu veniam deserunt occaecat eiusmod. Esse culpa enim ipsum culpa consectetur nulla et mollit proident. Qui voluptate amet mollit nulla.</Text>
            <Button color={style.color} onPress={() => search()} title="Recherche" />
        </View>
    )

}

export default About;