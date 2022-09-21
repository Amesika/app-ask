import React from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import axios from "axios";

import style from "../Style";
import WeatherRow from "../weather/Row";

export default class List extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            city: this.props.route.params.city,
            report: null
        }
        this.fetchWeather();
    }

    fetchWeather() {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=9849cfbfd4c19d2cbaa04e7752d4fb11&units=metric`)
            .then((reponse) => {
                this.setState({ report: reponse.data })
            })
    }

    render() {
        if (this.state.report === null) {
            return (
                <ActivityIndicator color={style.color} size="large"></ActivityIndicator>
            )
        } else {
            return (
                <View>
                    <FlatList
                        data={this.state.report.list}
                        renderItem={({ item, index }) =>
                            (<WeatherRow day={item} index={index} />)}
                    />
                </View>
            )
        }

    }
}