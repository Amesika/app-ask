import React from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment/moment";
import 'moment/locale/fr';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import FadeInView from "../animation/FadeInView";

moment.locale('fr')

export default class Row extends React.Component {

    day() {
        let day = moment(this.props.day.dt * 1000).format('ddd');
        return (
            <Text style={[style.white, style.bold]}>{day.toUpperCase()}</Text>
        )
    }

    icon(size = 50) {
        const type = this.props.day.weather[0].main.toLowerCase();
        let icon = "";
        switch (type) {
            case 'clouds':
                icon = "cloud"
                break;
            case 'rain':
                icon = "cloud-showers-heavy"
                break;
            default:
                icon = "sun"
        }

        return (
            <Text ><FontAwesome name={icon} color={style.white.color} size={size} /></Text>
        )
    }

    date() {
        let day = moment(this.props.day.dt * 1000).format('DD/MM : HH-mm');
        return (
            <Text>{day}</Text>
        )
    }


    render() {
        if (this.props.index === 0) {
            return (
                <FadeInView delay={this.props.index * 50}>
                <View style={[style.flex, style.view, style.firstView]}>
                    <View >
                        <Text style={{color:'#FFF'}}>{this.day()}  {this.date()}</Text>
                        <Text>{this.icon(90)}</Text>
                    </View>
                    <Text style={[style.temp, {fontSize:35}]}>{this.props.day.main.temp} °C</Text>
                </View>
                </FadeInView>
            )
        } else {
            return (
                <FadeInView delay={this.props.index * 50}>
                <View style={[style.flex, style.view]}>
                    <View style={style.flex}>
                        <Text>{this.icon()}</Text>
                        <Text style={{ marginLeft: 10 }}>{this.day()}  {this.date()}</Text>
                    </View>
                    <Text style={style.temp}>{this.props.day.main.temp} °C</Text>
                </View>
                </FadeInView>
            )
        }
    }
}

const style = StyleSheet.create({
    white: {
        color: '#FFF'
    },
    bold: {
        fontWeight: "bold",
    },
    flex: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
    },
    firstView: {
        backgroundColor: "#e54b65"
    },
    view: {
        backgroundColor: "#394163",
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#202340",
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: "space-between",
    },
    temp: {
        color: '#FFFFFF',
        fontWeight: "bold",
        fontSize: 22
    }
})