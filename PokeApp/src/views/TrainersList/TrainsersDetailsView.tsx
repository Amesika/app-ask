import { Button, Card } from "@rneui/base";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import * as commonStyle from '../../utils/commonStyle'

const TrainersDetailsView = (props:any) => {
 
    const {otherUser} = props.route.params;
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
                <Button title="Créer un chat" onPress={() => console.log('Chat création')} />
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