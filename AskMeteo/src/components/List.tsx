import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import axios from "axios";
import style from "../assets/Style";
import WeatherRow from "../components/weather/Row";

const List = () => {

    const [city, setCity] = useState<string>('');
    const [report, setReport] = useState<any>(null);

    useEffect(() => {
        fetchWeather()
    }, [])

    const fetchWeather = () => {
        console.log(city)
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9849cfbfd4c19d2cbaa04e7752d4fb11&units=metric`)
            .then((reponse: any) => {
                setReport(reponse.data)
            }).catch((error:any) => console.log(error))
    }

    return (
        <View>
            {
                report === null ?
                    <ActivityIndicator color={style.color} size="large"></ActivityIndicator> :
                    <FlatList
                        data={report.list}
                        renderItem={({ item, index }) =>
                            (<WeatherRow day={item} index={index} />)}
                    />
            }
        </View>
    )
}

export default List;