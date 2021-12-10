import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import { allItems } from './ItemInfo';
import {Picker} from '@react-native-picker/picker';

interface Ingredient {
  name: string;
  amount: number;
}
interface Item {
  name: string;
  itemsPerMin: number;
  ingredientList: Ingredient[];
  building: string;
  value: number;
}

export default function App() {
  const [currentItem, setCurrentItem] = useState("Wood Plank");
  const [amount, setAmount] = useState(50);

  return (
    <View style={{alignItems:'center'}}>
      <View style={{alignItems:'center'}}>
        <Text>{amount}</Text>
        <Slider
        style={{width:300}}
          value={amount}
          onValueChange={(value)=>{
            setAmount(Math.round(value))
          }}

          maximumValue={1000}
          minimumValue={0}
        />
      </View>
      <Picker
        style={{marginVertical: 30,
          width: 300,
          padding: 10,
          borderWidth: 1,
          borderColor: "#666",
          borderRadius: 5
        }}
        selectedValue={currentItem}
        onValueChange={(itemValue, itemIndex) =>
          setCurrentItem(itemValue)
        }
        itemStyle={{borderColor: 'red', borderWidth: 2, borderRadius: 5}}
        >
          {allItems.map((data) => {
            return <Picker.Item label={data.name}value={data.name}/>;
          })}
      </Picker>

      <Text>We want {amount} {currentItem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "50%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
