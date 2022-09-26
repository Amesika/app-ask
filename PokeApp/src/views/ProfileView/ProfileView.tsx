import { Card } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, StyleSheet, Text, View } from "react-native";
import * as commonStyle from '../../utils/commonStyle'
import { useSelector } from 'react-redux'
import User from "../../models/User";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ProfileView = (props: any) => {

    const userID: string = useSelector((state: any) => state.userIDStore.userID)

    const [user, setUser] = useState<User>(
        {
            name: "",
            age: 0,
            image: "",
            favoritePokemon: "",
            id: "0"
        }
    )

    useEffect(() => {
        const subscriber = firestore()
            .collection('users')
            .doc(userID)
            .onSnapshot(documentSnapshot => {
                console.log('User data: ', documentSnapshot.data());
                setUser(documentSnapshot.data())
            });

        return () => subscriber();
    }, [userID]);

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
            {user?.id === '0' ?
                <ActivityIndicator size='large' color='#0000cc' /> :
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
            }
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
