import { Button, Card } from "@rneui/base";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import User from "../../models/User";
import * as commonStyle from '../../utils/commonStyle'
import firestore from '@react-native-firebase/firestore';
import { createChatInFirebase, createChatUserProfileInFirebase } from "../../services/chatService";
import Chat from "../../models/chat";
import { getFormattedDate } from "../../utils/utils";

const TrainersDetailsView = (props: any) => {

    const { otherUser, currentUserID } = props.route.params;

    const createChatBetweenTwoUsers = () => {
        firestore()
            .collection('users')
            .doc(currentUserID)
            .get()
            .then(documentSnapshot => {
                console.log('User data: ', documentSnapshot.data());
                //@ts-ignore
                const currentUser:User = documentSnapshot.data()

                const chat: Chat = createChatInformation(currentUser, otherUser)

                console.log('Chat information: ', chat)

                createChatInFirebase(chat).then(
                    () =>{
                        console.log('[CHAT] Creation of the chat in fireestore between the two users.');
                    }
                ).catch((error)=>console.error(error))

                const chatUserInfo = {
                    name: chat.chat_id,
                    dateCreation: getFormattedDate()
                }
                createChatUserProfileInFirebase(currentUser.id,chat.chat_id,chatUserInfo)
                .then(
                    () =>{
                        console.log('[CHAT] Adding the chat in the list of chats of current user.');
                    }
                ).catch((error)=>console.error(error))

                createChatUserProfileInFirebase(otherUser.id,chat.chat_id,chatUserInfo)
                .then(
                    () =>{
                        console.log('[CHAT] Adding the chat in the list of chats of the other user.');
                    }
                ).catch((error)=>console.error(error))
            });
    }

    const createChatInformation = (currentUser: User, otherUserDetails: User): Chat => {
        let user_1;
        let user_2;
        if (currentUser.id < otherUserDetails.id) {
            user_1 = currentUser,
                user_2 = otherUserDetails
        } else {
            user_2 = currentUser,
                user_1 = otherUserDetails
        }

        const chat_id: string = 'chat_' + user_1.id + '_' + user_2.id;

        return {
            chat_id: chat_id,
            id_1: user_1.id,
            id_2: user_2.id,
            name_1: user_1.name,
            name_2: user_2.name,
            image_1: user_1.image,
            image_2: user_2.image
        }
    }

    return (
        <View>
            <Card>
                <Card.Title>{otherUser.name}</Card.Title>
                <Card.Divider />
                <View>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={style.imagePokemon} source={{ uri: otherUser.image }} />
                    </View>
                    <View style={style.detailsContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Text>Age: {otherUser.age} </Text>
                            <Text>Favorite Pokémon: {otherUser.favoritePokemon} </Text>
                        </View>
                    </View>
                </View>
                <Button title="Créer un chat" onPress={() => createChatBetweenTwoUsers()} />
            </Card>
        </View>
    )
}

const style = StyleSheet.create({
    imagePokemon: {
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

export default TrainersDetailsView;