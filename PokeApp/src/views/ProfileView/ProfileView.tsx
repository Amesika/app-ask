import { Card } from "@rneui/themed";
import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import * as commonStyle from '../../utils/commonStyle'
import { useSelector } from 'react-redux'
import User from "../../models/User";
import auth from '@react-native-firebase/auth';

const ProfileView = (props: any) => {

    const userID: string = useSelector((state: any) => state.userIDStore.userID)

    const user: User = {
        name: "Sacha",
        age: 18,
        image: "../../assets/images/sacha.jpeg",
        favoritePokemon: "Pikachu",
        id: "123"
    }

    const onSignOut = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!')
                props.navigation.navigate('Login')
            })
    }

    return (
        <View>
            <Card>
                <Card.Title>{user.name} (ID: {userID})</Card.Title>
                <Card.Divider />
                <View>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={style.image} source={require('../../assets/images/sacha.jpeg')} />
                    </View>
                    <View style={style.detailsContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Text>Age: {user.age} </Text>
                            <Text>Pokémon Favorie: {user.favoritePokemon} </Text>
                        </View>
                    </View>
                </View>
                <Button title="Se Déconnecter" onPress={() => onSignOut()} color={'#FFa07a'} />
            </Card>
        </View>
    )
}

const style = StyleSheet.create({
    image: {
        width: 300,
        height: 300
    },
    detailsContainer: {
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 10,
        ...commonStyle.elevationButton,
    }
})

export default ProfileView;