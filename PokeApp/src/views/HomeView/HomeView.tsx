import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { listPokeOriginal } from "../../data/PokemonList";
import { Pokemon } from "../../models/Pokemon";
import * as commonStyle from '../../utils/commonStyle'
import { getRandomInt, shuffle } from "../../utils/utils";
import {connect} from 'react-redux'

const HomeView = (props:any) => {

    const [counterPokedex, setCounterPokedex] = useState(0);
    const [listPoke, setListPoke] = useState<Pokemon[]>(undefined);
    const [isDataReceived,setIsDataReceived] = useState(false);

    const onCapturePokemon = () => {
        const currentPokemon = listPoke[counterPokedex];
        const action = {type: 'ADD_TO_LIST_POKEMON', value: currentPokemon}
        props.dispatch(action)
    }
    
    const onViewPokemonDetails = (idPokemon:Number, namePokemon: string,srcPokemon:string) => {
        props.navigation.navigate('Details',{
            id: idPokemon,
            name: namePokemon,
            src: srcPokemon,
            isReleasePossible: false
        });
    }

    const onNext = () => {
        if (counterPokedex === listPoke.length - 1) {
            setCounterPokedex(0)
        } else {
            setCounterPokedex(counterPokedex + 1);
        }
    }

    const onPrevious = () => {
        if (counterPokedex === 0) {
            setCounterPokedex(listPoke.length - 1)
        } else {
            setCounterPokedex(counterPokedex - 1);
        }
    }

    const getNamesPokemon = (namePokemon: string) => {
        console.log('My name is ', namePokemon)
        console.log('My neighbour is ', listPoke[counterPokedex + 1].name)
    }

    const modifyLevel = () => {
        let newArr = [...listPoke]
        newArr[counterPokedex].level = listPoke[counterPokedex].level + 5
        setListPoke(newArr);
    }

    const fetchPokemon = () => {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=151`;
        fetch(url)
        .then(response => response.json() )
        .then(json => {
            const newArray = json.results
            .map((pokemon:any,index:number)=> {
                let indexPokedex = index + 1;
                pokemon.id = indexPokedex;
                pokemon.level = getRandomInt(40,80);
                pokemon.isMale = true;
                pokemon.src = 'https://cdn.traction.one/pokedex/pokemon/'+ indexPokedex+'.png';
                return pokemon;
            })
            setListPoke(shuffle(newArray));
            setIsDataReceived(true);
        })
        .catch(error => console.log('Error: ',error))
    }
    
    useEffect(()=>{   
        fetchPokemon();
    }, [])

    return (
        <View style={style.mainContainer}>
            <View style={style.titleContainer}>
                <Text style={style.textTitle}>Pokédex Application</Text>
            </View>
            <View style={style.pokemonContainer}>
                {isDataReceived ?
                <PokemonInfo id={listPoke[counterPokedex].id} name={listPoke[counterPokedex].name}
                    level={listPoke[counterPokedex].level} isMale={listPoke[counterPokedex].isMale}
                    src={listPoke[counterPokedex].src}
                    onclickPokemon={onViewPokemonDetails}
                />:
                <ActivityIndicator size="large"/>
}
                </View>

            <View style={style.buttonContainer}>

                <TouchableOpacity
                    style={style.buttonNextPrevious}
                    onPress={() => onPrevious()}
                >
                    <Image source={require('../../assets/icons/left-arrow.png')} style={style.iconButton} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.buttonNextPrevious}
                    onPress={() => onCapturePokemon()}
                >
                    <Image source={require('../../assets/icons/pokeball.png')} style={style.iconButton} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.buttonNextPrevious}
                    onPress={() => onNext()}
                >
                    <Image source={require('../../assets/icons/right-arrow.png')} style={style.iconButton} />
                </TouchableOpacity>
            </View>
        </View>
    )
}



const PokemonInfo = ({ id, name, level, isMale, src, onclickPokemon }: Pokemon) => {
    return (
        <>
            <Text style={style.textAppeared}>A new Pokemon appeared !</Text>
            <TouchableOpacity
                onPress={() => onclickPokemon(id,name,src)}
            >
                <Image style={style.imagePokemon} source={{uri: src}} />
            </TouchableOpacity>
            <Text>His name is {name}, his levelPokemon is {level}.</Text>
            {isMale ?
                <Text>This is a male</Text> :
                <Text>This is a female</Text>}
        </>
    )
}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    pokemonContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center'
    },
    textTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'rgb(200,0,0 )',
        marginTop: 30 
    },
    imagePokemon: {
        width: 200,
        height: 200
    },

    iconButton: {
        width: 40,
        height: 40
    },
    // @ts-ignore
    buttonNextPrevious: {
        ...commonStyle.elevationButton,
        ...commonStyle.roundedButton
    },
    textAppeared:{
        marginBottom: 20,
        fontSize: 18,
        fontStyle: 'italic'
    }
})


const mapStateToProps = (state: any) =>{
    return {
        arrayPokemonCaptured: state.arrayPokemonCaptured.arrayPokemonCaptured
    }
}

const mapDispatchToProps = (dispatch: any) =>{
    return {
       dispatch: (action: any)=> { dispatch(action);}
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (HomeView);
