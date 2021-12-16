import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { allItems, resources } from "./ItemInfo";
import { Picker } from "@react-native-picker/picker";

export default function App() {
  interface Ingredient {
    name: string;
    amount: number;
    depth: number;
    numberOfBuildings: number;
    building: string;
  }

  interface Resources {
    Name: string,
    Amount: number,
    Building: string
  }

  const [currentItem, setCurrentItem] = useState("Wood Plank");
  const [amount, setAmount] = useState(1);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [workshopLevel, setWorkShopLevel] = useState(1);
  const [furnaceLevel, setFurnaceLevel] = useState(1);
  const [machineShopLevel, setMachineShopLevel] = useState(1);
  const [industrialFactoryLevel, setIndustrialFactoryLevel] = useState(1);
  const [forgeLevel, setForgeLevel] = useState(1);
  const [manufacturerLevel, setManufacturerLevel] = useState(1);
  const [extractorLevel, setExtractorLevel] = useState(1);
  const [rawResources, setRawResources] = useState<Resources[]>([]);

  var ingList: Ingredient[] = [];
  var resourceCount: Resources[] = [];

  // If any params are updated then we want to recalculate the list
  useEffect(() => {
    ingList = [];
    resourceCount = []

    const ingInfo = allItems.find((item) => {
      return item.name == currentItem;
    });

    const buildingLevel = getBuildingLevel(ingInfo!.building);
    const multiplier = levelMultiplier(buildingLevel!);
    const numberOfBuildings = amount / ingInfo!.itemsPerMin / multiplier;

    var building = ingInfo!.building;
    addIng(currentItem, amount, 0, numberOfBuildings, building);
    GenerateList(currentItem, amount);
    setIngredients(ingList);
    setRawResources(resourceCount);
  }, [
    workshopLevel,
    furnaceLevel,
    machineShopLevel,
    industrialFactoryLevel,
    forgeLevel,
    manufacturerLevel,
    extractorLevel,
    amount,
    currentItem,
  ]);

  useEffect(() => {
    if (ingList.length > 0) {
      return;
    }
  }, [ingList]);


  const addIng = (
    name: string,
    amount: number,
    depth: number,
    numberOfBuildings: number,
    building: string
  ) => {
    // Add to the sum list
    var itemInArray = false;
    resourceCount.forEach(element => {
      if(element.Name == name){
        element.Amount += amount
        itemInArray = true
      }
    });

    if(!itemInArray){
      resourceCount.push({
        Name: name,
        Amount: amount,
        Building: building
      })
    }

    const ingInfo = allItems.find((item) => {
      return item.name == name;
    });
    // Add to the tree list
    ingList.push({
      name: name,
      amount: amount,
      depth: depth,
      numberOfBuildings: Math.ceil(numberOfBuildings),
      building: building,
    });
  };

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
      case "extractor":
        return extractorLevel;
      case "Earth Transporter":
        return 1;
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
      const buildingLevel = getBuildingLevel("extractor");
      const multiplier = levelMultiplier(buildingLevel!);
      const numberOfBuildings = Math.ceil(
        requireAmountPerMin / (7.5 * multiplier)
      );
      if (resources.includes(ingredient.name)) {
        addIng(
          ingredient.name,
          requireAmountPerMin,
          depth,
          numberOfBuildings,
          "Extractor"
        );
      } else {
        const ingInfo = allItems.find((item) => {
          return item.name == ingredient.name;
        });
        const buildingLevel = getBuildingLevel(ingInfo!.building);
        const multiplier = levelMultiplier(buildingLevel!);
        const numberOfBuildings =
          requireAmountPerMin / ingInfo!.itemsPerMin / multiplier;
        addIng(
          ingredient.name,
          requireAmountPerMin,
          depth,
          numberOfBuildings,
          ingInfo!.building
        );
        GenerateList(ingredient.name, requireAmountPerMin, depth + 1);
      }
    });
  }

  function renderList(){
    return (
      <View style={{ alignItems: "flex-start" }}>
        {ingredients.map((data) => {
          if (data.amount == 0) {
            return null;
          }
          return (
            <Text style={{ paddingLeft: data.depth * 10 }}>
              {data.amount} {data.name} ({data.numberOfBuildings}{" "}
              {data.building})
            </Text>
          );
        })}
      </View>
    )
  }

  function renderIngList(){
    console.log(rawResources)
    return(
      <View style={{alignItems: 'flex-start'}}>
        {
          rawResources.map((data)=>{
            return(
              <Text>
                {data.Name}: {data.Amount}
              </Text>
            )
          })
        }
      </View>
    )
  }

  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
        <Text style={styles.buildingLevel}>Extractor Level:</Text>
        <TextInput
          style={styles.buildingLevelInput}
          keyboardType="numeric"
          onChangeText={(input) => {
            setExtractorLevel(Number(input.replace(/[^1-4]/g, "")));
          }}
          value={extractorLevel.toString()}
        />
        <Text style={styles.buildingLevel}>Workshop Level:</Text>
        <TextInput
          style={styles.buildingLevelInput}
          keyboardType="numeric"
          onChangeText={(input) => {
            setWorkShopLevel(Number(input.replace(/[^1-4]/g, "")));
          }}
          value={workshopLevel.toString()}
        />
        <Text style={styles.buildingLevel}>Furnace Level:</Text>
        <TextInput
          style={styles.buildingLevelInput}
          keyboardType="numeric"
          onChangeText={(input) => {
            setFurnaceLevel(Number(input.replace(/[^1-4]/g, "")));
          }}
          value={furnaceLevel.toString()}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
        <Text style={styles.buildingLevel}>Machine Shop Level:</Text>
        <TextInput
          style={styles.buildingLevelInput}
          keyboardType="numeric"
          onChangeText={(input) => {
            setMachineShopLevel(Number(input.replace(/[^1-4]/g, "")));
          }}
          value={machineShopLevel.toString()}
        />
        <Text style={styles.buildingLevel}>Industrial Factory Level:</Text>
        <TextInput
          style={styles.buildingLevelInput}
          keyboardType="numeric"
          onChangeText={(input) => {
            setIndustrialFactoryLevel(Number(input.replace(/[^1-4]/g, "")));
          }}
          value={industrialFactoryLevel.toString()}
        />
        <Text style={styles.buildingLevel}>Forge Level:</Text>
        <TextInput
          style={styles.buildingLevelInput}
          keyboardType="numeric"
          onChangeText={(input) => {
            setForgeLevel(Number(input.replace(/[^1-4]/g, "")));
          }}
          value={forgeLevel.toString()}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
        <Text style={styles.buildingLevel}>Manufacturer Level:</Text>
        <TextInput
          style={styles.buildingLevelInput}
          keyboardType="numeric"
          onChangeText={(input) => {
            setManufacturerLevel(Number(input.replace(/[^1-4]/g, "")));
          }}
          value={manufacturerLevel.toString()}
        />
      </View>
      <View style={{ alignItems: "center" }}>

        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 5 }}
        >
          <Text style={{ paddingRight: 5 }}>Items/Min</Text>
          <TextInput
            style={{
              width: 75,
              padding: 10,
              borderColor: "black",
              borderRadius: 5,
              borderWidth: 1,
              height: 40,
            }}
            keyboardType="numeric"
            onChangeText={(input) => {
              setAmount(Number(input.replace(/[^0-9]./g, "")));
            }}
            value={amount.toString()}
          />
          <View style={{ width: 5 }} />

          <Picker
            style={{
              width: 100,
              padding: 10,
              borderWidth: 1,
              borderColor: "#666",
              borderRadius: 5,
              height: 40,
            }}
            selectedValue={currentItem}
            onValueChange={(itemValue, itemIndex) => setCurrentItem(itemValue)}
            itemStyle={{ borderColor: "red", borderWidth: 2, borderRadius: 5 }}
          >
            {allItems
              .sort((a, b) => {
                return a.name.localeCompare(b.name);
              })
              .map((data) => {
                return <Picker.Item label={data.name} value={data.name} />;
              })}
          </Picker>
        </View>
      </View>
      {renderIngList() } 
      {//renderList()
      }
      <View style={{ height: 50 }} />
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
    paddingBottom: 30,
  },
  buildingLevel: {
    paddingLeft: 15,
    paddingRight: 2,
  },
  buildingLevelInput: {
    width: 30,
    padding: 5,
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
    height: 30,
  },
});
