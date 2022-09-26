import { Card } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, StyleSheet, Text, View } from "react-native";
import * as commonStyle from '../../utils/commonStyle'
import { useSelector } from 'react-redux'
import User from "../../models/User";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import { getFormattedDate } from "../../utils/utils";
import { createStorageReferenceToFile, updateInformationUserFirebase } from "../../services/updateService";
import storage from '@react-native-firebase/storage';

const ProfileView = (props: any) => {

    const [imageURL, setImageURL] = useState<any>(require('../../assets/images/mystery_pokemon.png'))
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
                //@ts-ignore
                setUser(documentSnapshot.data())
                //@ts-ignore
                setImageURL({uri:documentSnapshot.data().image})
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

    const _uploadImageToFireBase = (image: any, pathFirestore: string) => {
        const fileSource = image.path;
        const storageRef = createStorageReferenceToFile(pathFirestore);
        return storageRef.putFile(fileSource);
    }

    const onSelectImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setImageURL({ uri: image.path })
            const pathFirestorage = 'users/' + userID + '/images/img_' + getFormattedDate();
            Promise.resolve(_uploadImageToFireBase(image, pathFirestorage))
                .then(() => {
                    console.log('the picture has been correctly uploaded.')
                    storage().ref(pathFirestorage).getDownloadURL().then((downloadURL: any) => {
                        console.log('Download URL: ', downloadURL);
                        updateInformationUserFirebase(userID, { image: downloadURL })
                            .then(() => {
                                console.log('Success: Updated image in Firebase of the user: ', userID);
                            })
                            .catch((error: any) => console.log(error))
                    }).catch((error: any) => console.log(error))
                }).catch((error: any) => console.log(error))
        });
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
                            <Image style={style.image} source={imageURL} />
                        </View>
                        <View style={style.detailsContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Text>Age: {user.age} </Text>
                                <Text>Pokémon Favorie: {user.favoritePokemon} </Text>
                            </View>
                        </View>
                    </View>
                    <Button title="Changer Image" onPress={() => onSelectImage()} color={'#a0FF7a'} />
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
