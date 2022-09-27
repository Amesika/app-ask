import { Button, Card } from "@rneui/base";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import * as commonStyle from '../../utils/commonStyle'


const ChatDetails = (props: any) => {

    const { otherUser, currentUserID } = props.route.params;

    return (
        <View>
            <Text>This is list of messages</Text>
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

export default ChatDetails;