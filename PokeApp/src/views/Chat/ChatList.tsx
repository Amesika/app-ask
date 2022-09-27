import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import firestore from '@react-native-firebase/firestore';
import User from "../../models/User";
import { shuffle } from "../../utils/utils";
import { useSelector } from "react-redux";
import Chat from "../../models/chat";

const ChatList = (props: any) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [chatList, setChatList] = useState<Chat[]>([]);

    const currentUserID: string = useSelector((state: any) => state.userIDStore.userID)

    useEffect(() => {
        getChatListFromUser()
    }, [])

    const onViewChat = (chatDetail: Chat) => {
        props.navigation.navigate('ChatDetails', {
            chatDetail: chatDetail,
            currentUserID: currentUserID
        });
    }

    const getChatListFromUser = () => {
        console.log('Querying Chat from Firebase');
        setIsLoading(true)
        let listChatReceivedFirebase: Chat[] = []
        firestore().collection('users')
            .doc(currentUserID).collection('chats')
            .onSnapshot(querySnapShot => {
                const listChatNameCurrentUser: String[] = [];
                querySnapShot.forEach(
                    doc => {
                        listChatNameCurrentUser.push(doc.id)
                    }
                )
                console.log('[CHAT] Get the chat Name List of the User')
                console.log(listChatNameCurrentUser)

                firestore().collection('chats')
                    .where('chat_id', 'in', listChatNameCurrentUser)
                    .get()
                    .then(querySnapShot => {

                        querySnapShot.forEach(
                            doc => {
                                //@ts-ignore
                                listChatReceivedFirebase.push({
                                    chat_id: doc.id,
                                    ...doc.data()
                                })
                            }
                        )
                        console.log('List Chat Received From Firebase')
                        setIsLoading(false)
                        setChatList(listChatReceivedFirebase)
                    })
            })



    }

    return (
        <View>
            {isLoading ? <ActivityIndicator /> :
                <FlatList
                    data={chatList}
                    keyExtractor={item => item.chat_id.toString()}
                    renderItem={({ item }) => <ChatItem chatDetail={item} currentUserID={currentUserID} onViewChat={onViewChat} />}
                />}
        </View>
    )
}

interface IProps {
    chatDetail: Chat,
    onViewChat: any,
    currentUserID:string,
}

const ChatItem = ({ chatDetail, onViewChat, currentUserID }: IProps) => {

    let imageOtherUser;
    let nameOtherUser;

    if(currentUserID === chatDetail.id_1){
        imageOtherUser = chatDetail.image_2,
        nameOtherUser = chatDetail.name_2
    }else{
        imageOtherUser = chatDetail.image_1,
        nameOtherUser = chatDetail.name_1
    }

    return (
        <View>
            <TouchableOpacity style={style.mainContainer}
                onPress={() => onViewChat(chatDetail)}>
                <Image style={style.imagePokemon} source={{ uri: imageOtherUser }} />
                <View style={style.contentContainer}>
                    <View style={style.headerContainer}>
                        <Text style={style.titleText}>{ nameOtherUser}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row'
    },
    image: {
        width: 60,
        height: 60,
        margin: 5,
        borderRadius: 30
    },
    contentContainer: {
        flex: 1,
        margin: 5
    },
    headerContainer: {
        flex: 3,
        flexDirection: 'row'
    },
    dividerPokemon: {
        height: 1,
        width: '86%',
        backgroundColor: '#CED0CE',
        marginLeft: '14%'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1
    },
    levelText: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 12,
        color: '#555555'
    },
    imagePokemon: {
        width: 60,
        height: 60,
        borderRadius: 30
    }
})

export default ChatList;
