import React from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment/moment";
import 'moment/locale/fr';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import FadeInView from "../../animation/FadeInView";

moment.locale('fr')

const Row = (props: any) => {

    const day = () => {
        let day = moment(props.day.dt * 1000).format('ddd');
        return (
            <Text style={[style.white, style.bold]}>{day.toUpperCase()}</Text>
        )
    }

    const icon = (size = 50) => {
        const type = props.day.weather[0].main.toLowerCase();
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

    const date = () => {
        let day = moment(props.day.dt * 1000).format('DD/MM : HH-mm');
        return (
            <Text>{day}</Text>
        )
    }


    return (
        props.index === 0 ?
            <FadeInView delay={props.index * 50}>
                <View style={[style.flex, style.view, style.firstView]}>
                    <View >
                        <Text style={{ color: '#FFF' }}>{day()}  {date()}</Text>
                        <Text>{icon(90)}</Text>
                    </View>
                    <Text style={[style.temp, { fontSize: 35 }]}>{props.day.main.temp} °C</Text>
                </View>
            </FadeInView> :
            <FadeInView delay={props.index * 50}>
                <View style={[style.flex, style.view]}>
                    <View style={style.flex}>
                        <Text>{icon()}</Text>
                        <Text style={{ marginLeft: 10 }}>{day()}  {date()}</Text>
                    </View>
                    <Text style={style.temp}>{props.day.main.temp} °C</Text>
                </View>
            </FadeInView>
    )
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

export default Row;