import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import style from "../assets/Style";

const About = (props: any) => {

    const search = () => {
        props.navigation.navigate("Search")
    }

    return (
        <View style={style.container}>
            <Text style={style.title}>A propos de l'application</Text>
            <Text>
            Application météo qui vous fournit une météo en temps et en heure.
            </Text>


            <View style={localStyle.button}>
                <Button color={style.color} onPress={() => search()} title="Recherche" />
            </View>
            <Text style={localStyle.copyright}>
            Copyright © Amsika    
            </Text>
        </View>
    )

}

const localStyle = StyleSheet.create({
    button: {
        paddingVertical: 10
    },
    copyright: {
        textAlign:'center',
        flexDirection: 'row',
        height: 60,
        paddingHorizontal: 10,
        padding: 5,
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
})

export default About;