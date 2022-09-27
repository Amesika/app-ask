import React from "react";
import { View } from "react-native";

const TestView = () => {
    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 2, backgroundColor: 'red' }}></View>
            <View style={{ flex: 2, backgroundColor: 'green' }}></View>
            <View style={{ flex: 2, backgroundColor: 'blue' }}></View>
        </View>
    )
}

export default TestView;