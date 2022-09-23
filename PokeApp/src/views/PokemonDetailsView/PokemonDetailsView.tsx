import { Card } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import * as commonStyle from '../../utils/commonStyle'

const PokemonDetailsView = (props: any) => {

    const { id, name, src } = props.route.params
    const [weight, setWeight] = useState(undefined);
    const [height, setHeight] = useState(undefined);
    const [arrayTypes, setArrayTypes] = useState([]);


    useEffect(() => {
        fetchPokemonDetails(id)
    }, [id])

    const fetchPokemonDetails = (idPokemon: number) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
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
            .catch(error => console.log('Error: ', error))
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

export default PokemonDetailsView