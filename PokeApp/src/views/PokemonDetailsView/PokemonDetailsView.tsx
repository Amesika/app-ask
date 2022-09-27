import { Card } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import * as commonStyle from '../../utils/commonStyle'
import { connect, useSelector } from 'react-redux'
import { deletePokemonToMyPokedexInFirebase } from "../../services/updateService";

const PokemonDetailsView = (props: any) => {

    const { id, idPokemon, name, src, isReleasePossible } = props.route.params
    const [weight, setWeight] = useState(undefined);
    const [height, setHeight] = useState(undefined);
    const [arrayTypes, setArrayTypes] = useState([]);

    const currentUserID: string = useSelector((state: any) => state.userIDStore.userID)

    useEffect(() => {
        fetchPokemonDetails(idPokemon)
    }, [idPokemon])

    const releasePokemon = (idPokemon: string) => {
          deletePokemonToMyPokedexInFirebase(currentUserID, idPokemon)
            .then(() => {
                console.log('[REMOVE_POKEMON_IN_LIST] Success: Pokemon ID:' + idPokemon + 'is Release')
                const action = { type: 'REMOVE_POKEMON_IN_LIST', value: idPokemon }
                props.dispatch(action);
                props.navigation.navigate('MyPokemon')
            })
            .catch((error: any) => console.log(error))
    }

    const fetchPokemonDetails = (indexPokemon: number) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${indexPokemon}`;
        console.log(indexPokemon)
        fetch(url)
            .then(response => response.json())
            .then(json => {
                setHeight(json.height);
                setWeight(json.weight);

                const arrayTypes = json.types.map((item: any) => {
                    return item.type.name
                })
                setArrayTypes(arrayTypes);
            })
            .catch(error => console.log('Error fetchPokemonDetails: ', error))
    }

    return (
        <View>
            <Card>
                <Card.Title>{name}</Card.Title>
                <Card.Divider />
                <View>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={style.imagePokemon} source={{ uri: src }} />
                    </View>
                    <View style={style.detailsContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Text>Height: {height} </Text>
                            <Text>Weight: {weight} </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Text>
                                {arrayTypes.length !== 0 &&
                                    arrayTypes.map((item, index) => <Text key={index}> {item} &</Text>)}
                            </Text>
                        </View>
                    </View>
                </View>
                {isReleasePossible && <Button title="Release the Pokemon" onPress={() => releasePokemon(id)} />}
            </Card>
        </View>
    )
}

const style = StyleSheet.create({
    imagePokemon: {
        width: 350,
        height: 350
    },
    detailsContainer: {
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 10,
        ...commonStyle.elevationButton,
    }
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        dispatch: (action: any) => { dispatch(action); }
    }
}

export default connect(mapDispatchToProps)(PokemonDetailsView);