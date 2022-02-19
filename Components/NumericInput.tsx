import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";

export default function NumbericInput({
  height = 100,
  width = 100,
  incrementButtonStyle = {
    backgroundColor: "#FFCCCB",
    alignitems: "center",
    textAlign: "center",
  },
  decrementButtonStyle = {
    backgroundColor: "#90EE90",
    alignitems: "center",
    textAlign: "center",
  },
  value = "0",
  title = "",
  onChange = (value: number) => {
    console.log(value);
  },
  max = 1000000,
  min = 1,
  showButtons = true,
  stepSize = 1,
  updateOnStateChange = false,
  ...otherProps
}) {
  const [lastValue, setLastValue] = React.useState("");
  const [currentValue, setCurrentValue] = React.useState(value);

  useEffect(() => {
    if (updateOnStateChange) {
      setCurrentValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (currentValue.slice(-1) != ".") {
      onChange(Number(currentValue));
    }
  }, [currentValue]);

  function getNumericInput(text: string) {
    {
      if (text.length == 0 && updateOnStateChange) {
        setLastValue("");
        setCurrentValue("0");
        return;
      }
      let sanitizedString = "";
      let hasDecimal = false;
      text.split("").forEach((char) => {
        if ("1234567890.".includes(char)) {
          if (char == ".") {
            if (!hasDecimal) {
              hasDecimal = true;
              sanitizedString += char;
            }
          } else {
            sanitizedString += char;
          }
        }
      });
      if (sanitizedString.length == 0) {
        setCurrentValue("");
        setLastValue("");
        return;
      }
      if (Number(sanitizedString) > max) {
        sanitizedString = max.toString();
      }
      if (Number(sanitizedString) < min) {
        sanitizedString = min.toString();
      }
      if (sanitizedString != lastValue) {
        setCurrentValue(sanitizedString);
        setLastValue(sanitizedString);
      }
    }
  }

  function plusButton() {
    if (showButtons) {
      return (
        <TouchableOpacity
          style={[
            decrementButtonStyle,
            {
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              width: width / 4,
              height: height,
              justifyContent: "center",
            },
          ]}
          onPress={() => getNumericInput((Number(value) - stepSize).toString())}
        >
          <Text>-</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  function minusButton() {
    if (showButtons) {
      return (
        <TouchableOpacity
          style={[
            incrementButtonStyle,
            {
              borderBottomRightRadius: 10,
              borderTopRightRadius: 10,
              width: width / 4,
              height: height,
              justifyContent: "center",
            },
          ]}
          onPress={() => getNumericInput((Number(value) + stepSize).toString())}
        >
          <Text>+</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  function textInput() {
    if (showButtons) {
      return (
        <TextInput
          value={currentValue}
          style={{
            width: width / 2,
            textAlign: "center",
            borderColor: "#D3D3D3",
            borderWidth: 1,
            height: height,
          }}
          onChangeText={(text) => getNumericInput(text)}
          keyboardType="numeric"
        />
      );
    } else {
      return (
        <TextInput
          value={currentValue}
          style={{
            width: width / 2,
            textAlign: "center",
            borderColor: "#D3D3D3",
            borderWidth: 1,
            height: height,
            borderRadius: 10,
          }}
          onChangeText={(text) => getNumericInput(text)}
          keyboardType="numeric"
        />
      );
    }
  }

  return (
    <View
      style={{
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
    >
      <Text>{title}</Text>
      <View
        style={{
          width: width,
          height: height,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {plusButton()}
        {textInput()}
        {minusButton()}
      </View>
    </View>
  );
}
