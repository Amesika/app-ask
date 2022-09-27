import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import firestore from '@react-native-firebase/firestore';
import User from "../../models/User";
import { shuffle } from "../../utils/utils";
import { useSelector } from "react-redux";

const TrainersList = (props: any) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [trainersList, setTrainersList] = useState<User[]>([]);

    const currentUserID: string = useSelector((state: any) => state.userIDStore.userID)

    useEffect(() => {
        getUserFromFirebase()
    }, [])

    const onViewTrainers = (otherUser: User) => {
        props.navigation.navigate('TrainersDetails', {
            otherUser: otherUser,
            currentUserID: currentUserID
        });
    }

    const getUserFromFirebase = () => {
        console.log('Querying People from Firebase');
        setIsLoading(true)
        firestore().collection('users')
            .limit(100)
            .get()
            .then(querySnapShot => {
                let listUsers: User[] = [];
                querySnapShot.forEach(
                    doc => {
                        //@ts-ignore
                        listUsers.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                )
                listUsers = listUsers.filter((user: User) => user.id !== currentUserID)
                setTrainersList(listUsers);
                setIsLoading(false)
                console.log('Users have been received.')
            })
    }

    return (
        <View>
            {isLoading? <ActivityIndicator /> :
            <View ><FlatList
                data={trainersList}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <TrainerItem userDetail={item} onViewTrainer={onViewTrainers} />}
            />
            </View>}            
        </View>
    )
}

interface IProps {
    userDetail: User,
    onViewTrainer: any
}

const TrainerItem = ({ userDetail, onViewTrainer }: IProps) => {


    return (
        <View>
            <TouchableOpacity style={style.mainContainer}
                onPress={() => onViewTrainer(userDetail)}>
                <Image style={style.imagePokemon} source={{ uri: userDetail.image }} />
                <View style={style.contentContainer}>
                    <View style={style.headerContainer}>
                        <Text style={style.titleText}>{userDetail.name}</Text>
                    </View>
                    <View>
                        <Text style={style.levelText}>
                            Pokémon favori:  {userDetail.favoritePokemon}
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
        padding: 5,    
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
    },
})


const mapStateToProps = (state: any) => {
    return {
        arrayPokemonCaptured: state.arrayPokemonCaptured.arrayPokemonCaptured
    }
}

export default TrainersList;
