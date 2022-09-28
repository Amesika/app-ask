import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Button } from "react-native";
import axios from "axios";
import style from "../assets/Style";
import WeatherRow from "../components/weather/Row";

const List = (props: any) => {

    const [report, setReport] = useState<any>(null);
    const [msg, setMsg] = useState<string>("");

    useEffect(() => {
        fetchWeather()
    }, [])

    useEffect(() => {
        console.log("Msg: " + msg)
    }, [msg])

    const fetchWeather = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${props.route.params.city}&appid=9849cfbfd4c19d2cbaa04e7752d4fb11&units=metric`)
            .then((reponse: any) => {
                setReport(reponse.data)
            }).catch((error: any) => {
                setMsg(`La météo de ${props.route.params.city} n'a pas été trouvé.`);
                console.log(error)
            })
    }
    const search = () => {
        props.navigation.navigate("Search")
    }

    return (
        <View>
            {
                report === null ?
                    <View>
                        {
                            msg !== '' ?

                                <View style={style.container}>
                                    <Text style={localStyle.errorMessage}>{msg}</Text>
                                    <View style={localStyle.button}>
                                        <Button color={style.color} onPress={() => search()} title="Recherche" />
                                    </View>
                                </View>
                                :
                                <ActivityIndicator color={style.color} size="large"></ActivityIndicator>
                        }
                    </View> :
                    <FlatList
                        data={report.list}
                        renderItem={({ item, index }) =>
                            (<WeatherRow day={item} index={index} />)}
                    />

            }
        </View>
    )
}

const localStyle = StyleSheet.create({
    errorMessage: {
        textAlign: 'center'
    },
    button: {
        paddingVertical: 10
    }
})

export default List;