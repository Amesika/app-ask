import { Card } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { listPokeOriginal } from "../../data/PokemonList";
import * as commonStyle from '../../utils/commonStyle'

const MyPokemonView = (props: any) => {

    const onViewPokemonDetails = (idPokemon:Number, namePokemon: string,srcPokemon:string) => {
        props.navigation.navigate('Details',{
            id: idPokemon,
            name: namePokemon,
            src: srcPokemon
        });
    }
    return (
        <View>
            <FlatList
                data={listPokeOriginal}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <PokemonItem pokemon={item}  onClickPokemon={onViewPokemonDetails} />}
            />
        </View>
    )
}

const PokemonItem = (props: any) => {
    const { pokemon, onClickPokemon } = props;

    return (
        <View>
            <TouchableOpacity style={style.mainContainer}
                onPress={() => onClickPokemon(pokemon.id, pokemon.name, pokemon.src)}>
                <Image style={style.imagePokemon} source={{ uri: pokemon.src }} />
                <View style={style.contentContainer}>
                    <View style={style.headerContainer}>
                        <Text style={style.titleText}>{pokemon.name}</Text>
                    </View>
                    <View>
                        <Text style={style.levelText}>
                            Level:  {pokemon.level}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    mainContainer:{
        flexDirection:'row'
    },
    image:{
        width:60,
        height:60,
        margin:5,
        borderRadius:30
    },
    contentContainer:{
        flex: 1,
        margin: 5
    },
    headerContainer:{
        flex: 3,
        flexDirection: 'row'
    },
    dividerPokemon:{
        height: 1,
        width: '86%',
        backgroundColor: '#CED0CE',
        marginLeft: '14%'
    },
    titleText:{
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1
    },
    levelText:{
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 12,
        color:'#555555'
    },
    imagePokemon: {
        width: 60,
        height: 60,
        borderRadius: 30
    }
})

export default MyPokemonView