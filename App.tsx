import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import { allItems, resources } from "./ItemInfo";
import { Picker } from "@react-native-picker/picker";

export default function App() {
  const [currentItem, setCurrentItem] = useState("Wood Plank");
  const [amount, setAmount] = useState(50);
  const [ingredients, setIngredients] = useState([{}]);

  const [workshopLevel, setWorkShopLevel] = useState(4);
  const [furnaceLevel, setFurnaceLevel] = useState(4);
  const [machineShopLevel, setMachineShopLevel] = useState(4);
  const [industrialFactoryLevel, setIndustrialFactoryLevel] = useState(4);
  const [forgeLevel, setForgeLevel] = useState(4);
  const [manufacturerLevel, setManufacturerLevel] = useState(2);

  function getBuildingLevel(name: string) {
    switch (name.toLowerCase()) {
      case "workshop":
        return workshopLevel;
      case "furnace":
        return furnaceLevel;
      case "machineshop":
        return machineShopLevel;
      case "industrialfactory":
        return industrialFactoryLevel;
      case "forge":
        return forgeLevel;
      case "manufacturer":
        return manufacturerLevel;
    }
  }

  function levelMultiplier(level: number) {
    switch (level) {
      case 1:
        return 1;
      case 2:
        return 1.5;
      case 3:
        return 2;
      case 4:
        return 3;
    }
  }

  function helloWorld(name: string, amountPerMin = 1, depth = 1) {
    const itemInfo = allItems.find((item) => {
      return item.name == name;
    });

    itemInfo?.ingredientList.forEach((ingredient) => {
      if (resources.includes(ingredient.name)) {
        setIngredients([
          ...ingredients,
          {
            name: ingredient.name,
            amount: ingredient.amount * amountPerMin,
            depth: depth,
          },
        ]);
      } else {
        const ingInfo = allItems.find((item) => {
          return item.name == ingredient.name;
        });

        const buildingLevel = getBuildingLevel(ingInfo!.building);
        const multiplier = levelMultiplier(!buildingLevel);
      }
    });
  }

  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ alignItems: "center" }}>
        <Text>{amount}</Text>
        <Slider
          style={{ width: 300 }}
          value={amount}
          onValueChange={(value) => {
            setAmount(Math.round(value));
          }}
          maximumValue={1000}
          minimumValue={0}
        />
      </View>
      <Picker
        style={{
          marginVertical: 30,
          width: 300,
          padding: 10,
          borderWidth: 1,
          borderColor: "#666",
          borderRadius: 5,
        }}
        selectedValue={currentItem}
        onValueChange={(itemValue, itemIndex) => setCurrentItem(itemValue)}
        itemStyle={{ borderColor: "red", borderWidth: 2, borderRadius: 5 }}
      >
        {allItems.map((data) => {
          return <Picker.Item label={data.name} value={data.name} />;
        })}
      </Picker>

      <Text>
        We want {amount} {currentItem}
      </Text>
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
