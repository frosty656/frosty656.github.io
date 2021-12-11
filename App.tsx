import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Slider from "@react-native-community/slider";
import { allItems, resources } from "./ItemInfo";
import { Picker } from "@react-native-picker/picker";

export default function App() {
  interface Ingredient {
    name: string,
    amount: number,
    depth: number,
    numberOfBuildings: number;
  }

  const [currentItem, setCurrentItem] = useState("Wood Plank");
  const [amount, setAmount] = useState(50);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [workshopLevel, setWorkShopLevel] = useState(4);
  const [furnaceLevel, setFurnaceLevel] = useState(4);
  const [machineShopLevel, setMachineShopLevel] = useState(4);
  const [industrialFactoryLevel, setIndustrialFactoryLevel] = useState(4);
  const [forgeLevel, setForgeLevel] = useState(4);
  const [manufacturerLevel, setManufacturerLevel] = useState(2);

  var ingList:Ingredient[] = [];

  // If any params are updated then we want to recalculate the list
  useEffect(()=>{
    ingList = []
    GenerateList(currentItem, amount)
    setIngredients(ingList)
  },[workshopLevel, furnaceLevel, machineShopLevel, industrialFactoryLevel, forgeLevel, manufacturerLevel, amount, currentItem])

  useEffect(()=>{
    if(ingList.length > 0){
      return
    }
  }, [ingList])

  const addIng = (name: string, amount: number, depth: number, numberOfBuildings: number) => {
    ingList.push({name: name, amount: amount, depth: depth, numberOfBuildings: numberOfBuildings})
  }

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
      default:
        return 1;
    }
  }

  function GenerateList(name: string, amountPerMin = 1, depth = 1) {
    const itemInfo = allItems.find((item) => {
      return item.name == name;
    });

    itemInfo?.ingredientList.forEach((ingredient) => {
      const requireAmountPerMin = ingredient.amount * amountPerMin;
      if (resources.includes(ingredient.name)) {

        addIng(ingredient.name, requireAmountPerMin, depth, 0)
      } else {
        const ingInfo = allItems.find((item) => {
          return item.name == ingredient.name;
        });

        const buildingLevel = getBuildingLevel(ingInfo!.building);
        const multiplier = levelMultiplier(buildingLevel!);
        const numberOfBuildings = requireAmountPerMin / ingInfo!.itemsPerMin / multiplier;
        addIng(ingredient.name, requireAmountPerMin, depth, numberOfBuildings)

        GenerateList(ingredient.name, requireAmountPerMin, depth + 1)
      }
    });
  }

  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ alignItems: "center" }}>
      <TextInput
        keyboardType='numeric'
        onChangeText={(input)=>{
          setAmount(Number(input.replace(/[^0-9]/g, '')))
        }}
        value={amount.toString()}
      />
        <View>
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
        <Text>------------------------</Text>
        <View style={{alignItems:'flex-start'}}>
      {ingredients.map((data) => {
        if(data.amount == 0){
          return null;
        }
          return <Text style={{paddingLeft: data.depth*10}}>{data.amount} {data.name}</Text>;
        })}
        </View>
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
