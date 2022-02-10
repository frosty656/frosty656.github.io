import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";

const NumericInput = (props: any) => {

    const {
        height = 100,
        width = 100,
        incrementButtonStyle = {backgroundColor: '#90EE90', alignitems: 'center', textAlign: 'center'},
        onIncrement = () => {},
        onDecrement = () => {},
        decrementButtonStyle = {backgroundColor: '#FFCCCB', alignitems: 'center', textAlign: 'center'},
        value,
    } = props;
    return(
        <View style={{width: width, height: height, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity style={[incrementButtonStyle, {borderTopLeftRadius: 10, borderBottomLeftRadius: 10, width: width/3, height: height, justifyContent: 'center'}]} onPress={onIncrement}>
                <Text>+</Text>
            </TouchableOpacity>
            <TextInput value={value} style={{width: width/3, textAlign: 'center', borderColor: '#D3D3D3', borderWidth: 1, height: height}}/>
            <TouchableOpacity style={[decrementButtonStyle, {borderBottomRightRadius: 10, borderTopRightRadius: 10, width: width/3, height: height, justifyContent: 'center'}]} onPress={onDecrement}>
                <Text>-</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NumericInput;