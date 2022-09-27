import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Pokemon } from '../models/Pokemon';

/**
 * Upload the information of the user
 * @param userID 
 * @param informationToAdd 
 */
export async function addInformationUserFirebase(userID: string, informationToAdd: any){
    const ref = firestore().collection('users').doc(userID);

    await ref.set(
        informationToAdd
    )
} 

/**
 * Update the information of the user
 * @param userID 
 * @param informationToAdd 
 */
 export async function updateInformationUserFirebase(userID: string, informationToAdd: any){
    const ref = firestore().collection('users').doc(userID);

    await ref.update(
        informationToAdd
    )
} 

export const createStorageReferenceToFile = (pathFirestore:string) => {
    const FireBaseStorage = storage()
    return FireBaseStorage.ref(pathFirestore)
}

/**
 * Add pokemon to my pokedex
 * @param userID 
 * @param pokemonID 
 * @param myPokemonInfo 
 */
export async function addPokemonToMyPokedexInFirebase(userID: string, pokemonID:string,myPokemonInfo: Pokemon){
    const ref = firestore().collection('users').doc(userID).collection('pokemons').doc(pokemonID);
    await ref.set(
        myPokemonInfo
    )
}

/**
 * Remove pokemon to my pokedex
 * @param userID 
 * @param pokemonID 
 * @param myPokemonInfo 
 */
export async function deletePokemonToMyPokedexInFirebase(userID: string, pokemonID:string){
    const ref = firestore().collection('users').doc(userID).collection('pokemons').doc(pokemonID);
    await ref.delete()
} 

