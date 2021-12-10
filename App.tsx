import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Svg, Line, Path } from "react-native-svg";
import Slider from "@react-native-community/slider";

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

let allItems: Item[] = [];

// Workshop
allItems.push({
  name: "Wood Plank",
  itemsPerMin: 15,
  ingredientList: [{ name: "Wood Log", amount: 1 }],
  building: "Workshop",
  value: 1,
});

allItems.push(
  {
    name: "Wood Plank",
    itemsPerMin: 15,
    building: "Workshop",
    value: 1,
    ingredientList: [{ name: "Wood Log", amount: 1 }],
  },
  {
    name: "Wood Frame",
    itemsPerMin: 7.5,
    building: "Workshop",
    value: 4,
    ingredientList: [{ name: "Wood Plank", amount: 4 }],
  },
  {
    name: "Copper Wire",
    itemsPerMin: 30,
    building: "Workshop",
    value: 2,
    ingredientList: [{ name: "Copper Ingot", amount: 3 }],
  },
  {
    name: "Heat Sink",
    itemsPerMin: 10,
    building: "Workshop",
    value: 5,
    ingredientList: [{ name: "Copper Ingot", amount: 5 }],
  },
  {
    name: "Iron Gear",
    itemsPerMin: 15,
    building: "Workshop",
    value: 2,
    ingredientList: [{ name: "Iron Ingot", amount: 2 }],
  },
  {
    name: "Iron Plating",
    itemsPerMin: 20,
    building: "Workshop",
    value: 2,
    ingredientList: [{ name: "Iron Ingot", amount: 4 }],
  },
  {
    name: "Steel Rod",
    itemsPerMin: 15,
    building: "Workshop",
    value: 35,
    ingredientList: [{ name: "Steel", amount: 3 }],
  },
  {
    name: "Sand",
    itemsPerMin: 40,
    building: "Workshop",
    value: 1,
    ingredientList: [{ name: "Stone", amount: 1 }],
  },
  {
    name: "Condenser Lens",
    itemsPerMin: 20,
    building: "Workshop",
    value: 12,
    ingredientList: [{ name: "Glass", amount: 3 }],
  },
  {
    name: "Carbon Fiber",
    itemsPerMin: 7.5,
    building: "Workshop",
    value: 24,
    ingredientList: [{ name: "Graphite", amount: 4 }],
  },
  {
    name: "Coupler",
    itemsPerMin: 6,
    building: "Workshop",
    value: 24,
    ingredientList: [{ name: "Tungsten Carbide", amount: 1 }],
  },
  {
    name: "Iron Ingot",
    itemsPerMin: 30,
    building: "Furnace",
    value: 1,
    ingredientList: [{ name: "Iron Ore", amount: 1 }],
  },
  {
    name: "Copper Ingot",
    itemsPerMin: 30,
    building: "Furnace",
    value: 1,
    ingredientList: [{ name: "Copper Ore", amount: 1 }],
  },
  {
    name: "Silicone",
    itemsPerMin: 20,
    building: "Furnace",
    value: 2,
    ingredientList: [{ name: "Sand", amount: 2 }],
  },
  {
    name: "Glass",
    itemsPerMin: 10,
    building: "Furnace",
    value: 4,
    ingredientList: [{ name: "Sand", amount: 4 }],
  },
  {
    name: "Tungsten Ore",
    itemsPerMin: 30,
    building: "Furnace",
    value: 5,
    ingredientList: [{ name: "Wolframite", amount: 5 }],
  },
  {
    name: "Electromagnet",
    itemsPerMin: 7.5,
    building: "Machine Shop",
    value: 14,
    ingredientList: [
      { name: "Copper Wire", amount: 6 },
      { name: "Iron Ingot", amount: 2 },
    ],
  },
  {
    name: "Logic Circuit",
    itemsPerMin: 10,
    building: "Machine Shop",
    value: 10,
    ingredientList: [
      { name: "Copper Wire", amount: 3 },
      { name: "Silicone", amount: 2 },
    ],
  },
  {
    name: "Metal Frame",
    itemsPerMin: 5,
    building: "Machine Shop",
    value: 12,
    ingredientList: [
      { name: "Wood Frame", amount: 1 },
      { name: "Iron Plating", amount: 4 },
    ],
  },
  {
    name: "Battery",
    itemsPerMin: 2.5,
    building: "Machine Shop",
    value: 150,
    ingredientList: [
      { name: "Electromagnet", amount: 8 },
      { name: "Graphite", amount: 8 },
    ],
  },
  {
    name: "Rotor",
    itemsPerMin: 10,
    building: "Machine Shop",
    value: 40,
    ingredientList: [
      { name: "Iron Plating", amount: 2 },
      { name: "Steel Rod", amount: 1 },
    ],
  },
  {
    name: "Nano Wire",
    itemsPerMin: 5,
    building: "Machine Shop",
    value: 60,
    ingredientList: [
      { name: "Glass", amount: 4 },
      { name: "Carbon Fiber", amount: 2 },
    ],
  },
  {
    name: "Graphite",
    itemsPerMin: 15,
    building: "Forge",
    value: 6,
    ingredientList: [
      { name: "Wood Log", amount: 3 },
      { name: "Coal", amount: 3 },
    ],
  },
  {
    name: "Steel",
    itemsPerMin: 7.5,
    building: "Forge",
    value: 12,
    ingredientList: [
      { name: "Iron Ore", amount: 6 },
      { name: "Graphite", amount: 1 },
    ],
  },
  {
    name: "Concrete",
    itemsPerMin: 7.5,
    building: "Forge",
    value: 40,
    ingredientList: [
      { name: "Sand", amount: 10 },
      { name: "Steel Rod", amount: 1 },
    ],
  },
  {
    name: "Tungsten Carbide",
    itemsPerMin: 12,
    building: "Forge",
    value: 16,
    ingredientList: [
      { name: "Tungsten Ore", amount: 2 },
      { name: "Graphite", amount: 1 },
    ],
  },
  {
    name: "Computer",
    itemsPerMin: 7.5,
    building: "Industrial Factory",
    value: 60,
    ingredientList: [
      { name: "Heat Sink", amount: 3 },
      { name: "Metal Frame", amount: 1 },
      { name: "Logic Circuit", amount: 3 },
    ],
  },
  {
    name: "Electric Motor",
    itemsPerMin: 3,
    building: "Industrial Factory",
    value: 250,
    ingredientList: [
      { name: "Iron Gear", amount: 4 },
      { name: "Rotor", amount: 2 },
      { name: "Battery", amount: 1 },
    ],
  },
  {
    name: "Electron Microscope",
    itemsPerMin: 2.5,
    building: "Manufacturer",
    value: 300,
    ingredientList: [
      { name: "Condenser Lens", amount: 4 },
      { name: "Electromagnet", amount: 8 },
      { name: "Metal Frame", amount: 2 },
      { name: "Nano Wire", amount: 2 },
    ],
  },
  {
    name: "Turbocharger",
    itemsPerMin: 4,
    building: "Manufacturer",
    value: 250,
    ingredientList: [
      { name: "Iron Gear", amount: 8 },
      { name: "Logic Circuit", amount: 4 },
      { name: "Nano Wire", amount: 2 },
      { name: "Coupler", amount: 4 },
    ],
  },
  {
    name: "Super Computer",
    itemsPerMin: 2,
    building: "Manufacturer",
    value: 250,
    ingredientList: [
      { name: "Computer", amount: 1 },
      { name: "Heat Sink", amount: 8 },
      { name: "Turbocharger", amount: 1 },
      { name: "Coupler", amount: 8 },
    ],
  }
);

export default function App() {
  return (
    <View>
      {allItems.map((data) => {
        return <Text>{data.name}</Text>;
      })}
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
