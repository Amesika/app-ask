import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { connect, useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import { Pokemon } from "../../models/Pokemon";

const MyPokemonView = (props: any) => {

    const currentUserID: string = useSelector((state: any) => state.userIDStore.userID)

    useEffect(() => {
        updateArrarPokemonCaptured();
    }, [])

    const updateArrarPokemonCaptured = () => {
        firestore().collection('users').doc(currentUserID).collection('pokemons')
            .get()
            .then(querySnapShot => {

                let listPokemon: Pokemon[] = [];
                querySnapShot.forEach(
                    doc => {
                        //@ts-ignore
                        listPokemon.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                )
               
                const action = { type: 'GET_LIST_POKEMON', value: listPokemon }
                props.dispatch(action);
                console.log('Reload pokemon captured.')
            })
    }

    const onViewPokemonDetails = (id: string, idPokemon: number, namePokemon: string, srcPokemon: string) => {
        props.navigation.navigate('Details', {
            id: id,
            idPokemon: idPokemon,
            name: namePokemon,
            src: srcPokemon,
            isReleasePossible: true
        });
    }
    return (
        <View>
            <FlatList
                data={props.arrayPokemonCaptured}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <PokemonItem pokemon={item} onClickPokemon={onViewPokemonDetails} />}
            />
        </View>
    )
}

const PokemonItem = (props: any) => {
    const { pokemon, onClickPokemon } = props;

    return (
        <View>
            <TouchableOpacity style={style.mainContainer}
                onPress={() => onClickPokemon(pokemon.id, pokemon.idPokemon, pokemon.name, pokemon.src)}>
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
    mainContainer: {
        flexDirection: 'row',
        padding: 5
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


const mapStateToProps = (state: any) => {
    return {
        arrayPokemonCaptured: state.arrayPokemonCaptured.arrayPokemonCaptured
    }
}

export default connect(mapStateToProps)(MyPokemonView);
