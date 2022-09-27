import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, View } from "react-native";
import firestore from '@react-native-firebase/firestore';
import Message from "../../models/Message";
import { moderateScale } from 'react-native-size-matters';
import { TouchableOpacity } from "react-native-gesture-handler";
import { getFormattedDate } from "../../utils/utils";
import { addMessagesOnChatInFirestore } from "../../services/chatService";

const ChatDetails = (props: any) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { chatDetail, currentUserID } = props.route.params;
    const [messagesList, setMessagesList] = useState<Message[]>([])
    const [textInput, setTextInput] = useState<string>('')

    useEffect(() => {
        getMessageList()
    }, [])

    const getMessageList = () => {

        console.log('[CHAT] Receiving Messages from Firebase chat:', chatDetail.chat_id)
        setIsLoading(true)
        const ref = firestore().collection('chats')
            .doc(chatDetail.chat_id).collection('messages')
        ref.onSnapshot(querySnapShot => {
            const listMessages: Message[] = [];
            querySnapShot.forEach(
                doc => {
                    //@ts-ignore
                    listMessages.push({
                        id: doc.id,
                        ...doc.data()
                    })
                }
            )
            setMessagesList(listMessages);
            console.log('Get the messages with success.')
            setIsLoading(false)
        })
    }

    const _renderMessageItem = (message: Message) => {
        if (currentUserID === message.senderID) {
            return (
                <View style={[style.item, style.itemOut]} >
                    <View style={[style.balloon, { backgroundColor: '#1084FF' }]}>
                        <Text style={style.text_message_bubble}>{message.textMessage}</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={[style.item, style.itemIn]} >
                    <View style={[style.balloon, { backgroundColor: 'grey' }]}>
                        <Text style={style.text_message_bubble}>{message.textMessage}</Text>
                    </View>
                </View>
            );
        }
    };

    const sendTextMessage = () => {
        console.log('[Chat] Send a text message.')
        const messageID: string = 'message_' + getFormattedDate();

        const messageInfo: Message = {
            id: messageID,
            senderID: currentUserID,
            textMessage: textInput,
            timeStamp: getFormattedDate()
        }

        addMessagesOnChatInFirestore(chatDetail.chat_id, messageID, messageInfo)
            .then(() => {
                console.log('[Chat] Success: Added the text message from user:', currentUserID,
                    'in Firebase for the chat ID:', chatDetail.chat_id)
                setTextInput('');
            })
            .catch((error: any) => console.error(error))
    }

    return (
        <View style={style.mainContainer}>
            {isLoading ? <ActivityIndicator /> :
                <FlatList
                    data={messagesList}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <View>
                            {_renderMessageItem(item)}
                        </View>
                    }
                />}
            <View style={style.footer}>
                <View style={style.inputContainer}>
                    <TextInput
                        style={[style.inputs]}
                        multiline={true}
                        placeholder='Write a message'
                        underlineColorAndroid="transparent"
                        onChangeText={setTextInput}
                        value={textInput}
                        onSubmitEditing={() => sendTextMessage()}
                    />
                    {
                        textInput !== '' &&
                        <TouchableOpacity style={style.btnSend} onPress={() => sendTextMessage()} >
                            <Image source={require('../../assets/icons/ic_share.png')} style={style.iconSend} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        height: 60,
        paddingHorizontal: 10,
        padding: 5,
    },

    // Bubble Chat
    item: {
        marginVertical: moderateScale(7, 2),
        flexDirection: 'row',
    },
    itemIn: {
        marginLeft: 20,
    },
    itemOut: {
        alignSelf: 'flex-end',
        marginRight: 20,
    },
    balloon: {
        maxWidth: moderateScale(250, 2),
        paddingHorizontal: moderateScale(10, 2),
        paddingTop: moderateScale(5, 2),
        paddingBottom: moderateScale(7, 2),
        borderRadius: 20,
    },
    arrowContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        flex: 1,
    },
    arrowLeftContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    arrowRightContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    arrowLeft: {
        left: moderateScale(-6, 0.5),
    },
    arrowRight: {
        right: moderateScale(-6, 0.5),
    },
    text_message_bubble: {
        paddingTop: 5,
        color: 'white',
    },
    // End Chat Bubbles


    // Buttons related
    btnSend: {
        backgroundColor: '#00BFFF',
        width: 40,
        height: 40,
        borderRadius: 360,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconSend: {
        width: 30,
        height: 30,
        alignSelf: 'center',
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
    inputs: {
        height: 40,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
});

export default ChatDetails;