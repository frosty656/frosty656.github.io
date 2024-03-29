// https://www.npmjs.com/package/react-native-numeric-input
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { allItems, resources } from "./ItemInfo";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import NumericInput from "./Components/NumericInput";

// Test commit for jenkins

export default function App() {
  interface Ingredient {
    name: string;
    amount: number;
    depth: number;
    numberOfBuildings: number;
    building: string;
  }

  interface Resources {
    Name: string;
    Amount: number;
    Building: string;
  }
  const [treeView, setTreeView] = useState('tree');
  const [currentItem, setCurrentItem] = useState("Wood Plank");
  const [amount, setAmount] = useState(1);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [rawResources, setRawResources] = useState<Resources[]>([]);

  const [workshopLevel, setWorkShopLevel] = useState(1);
  const [furnaceLevel, setFurnaceLevel] = useState(1);
  const [machineShopLevel, setMachineShopLevel] = useState(1);
  const [industrialFactoryLevel, setIndustrialFactoryLevel] = useState(1);
  const [forgeLevel, setForgeLevel] = useState(1);
  const [manufacturerLevel, setManufacturerLevel] = useState(1);
  const [extractorLevel, setExtractorLevel] = useState(1);
  const [beltIPM, setBeltIPM] = useState(420);

  const [maxItemPerMin, setMaxItemPerMin] = useState(0);
  const [woodExtractorAmount, setWoodExtractorAmount] = useState(50);
  const [stoneExtractorAmount, setStoneExtractorAmount] = useState(50);
  const [ironExtractorAmount, setIronExtractorAmount] = useState(50);
  const [copperExtractorAmount, SetCopperExtractorAmount] = useState(50);
  const [wolframiteExtractorAmount, setWolframiteExtractorAmount] =
    useState(50);
  const [coalExtractorAmount, setCoalExtractorAmount] = useState(50);

  var ingList: Ingredient[] = [];
  var resourceCount: Resources[] = [];

  const [isLoading, setIsLoading] = useState(true);

  // Onload
  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem("@info");
        if (value !== null) {
          const info = JSON.parse(value);
          setWoodExtractorAmount(info.woodExtractorAmount ?? 50);
          setStoneExtractorAmount(info.stoneExtractorAmount ?? 50);
          setIronExtractorAmount(info.ironExtractorAmount ?? 50);
          SetCopperExtractorAmount(info.copperExtractorAmount ?? 50);
          setWolframiteExtractorAmount(info.wolframiteExtractorAmount ?? 50);
          setCoalExtractorAmount(info.coalExtractorAmount ?? 50);
          setWorkShopLevel(info.workshopLevel ?? 1);
          setFurnaceLevel(info.furnaceLevel ?? 1);
          setMachineShopLevel(info.machineShopLevel ?? 1);
          setIndustrialFactoryLevel(info.industrialFactoryLevel ?? 1);
          setForgeLevel(info.forgeLevel ?? 1);
          setManufacturerLevel(info.manufacturerLevel ?? 1);
          setExtractorLevel(info.extractorLevel ?? 1);
          setAmount(info.amount ?? 1);
          setCurrentItem(info.currentItem ?? "Wood Plank");
          setBeltIPM(info.beltIPM ?? 420);

        }
      } catch (e) {
        console.error("Error: " + e);
      }
      setIsLoading(false);
    })();
  }, []);

  // Onsave
  useEffect(() => {
    if (isLoading) {
      return;
    }
    const data = {
      woodExtractorAmount: woodExtractorAmount,
      stoneExtractorAmount: stoneExtractorAmount,
      ironExtractorAmount: ironExtractorAmount,
      copperExtractorAmount: copperExtractorAmount,
      wolframiteExtractorAmount: wolframiteExtractorAmount,
      coalExtractorAmount: coalExtractorAmount,
      extractorLevel: extractorLevel,
      workshopLevel: workshopLevel,
      furnaceLevel: furnaceLevel,
      machineShopLevel: machineShopLevel,
      industrialFactoryLevel: industrialFactoryLevel,
      forgeLevel: forgeLevel,
      manufacturerLevel: manufacturerLevel,
      amount: amount,
      currentItem: currentItem,
      beltIPM: beltIPM,

    };

    (async () => {
      try {
        await AsyncStorage.setItem("@info", JSON.stringify(data));
      } catch (e) {
        console.log("Error saving data " + e);
      }
    })();
  }),
    [
      woodExtractorAmount,
      stoneExtractorAmount,
      ironExtractorAmount,
      copperExtractorAmount,
      wolframiteExtractorAmount,
      coalExtractorAmount,
      extractorLevel,
      workshopLevel,
      furnaceLevel,
      machineShopLevel,
      industrialFactoryLevel,
      forgeLevel,
      manufacturerLevel,
      amount,
      currentItem,
      beltIPM,
    ];

  // If any params are updated then we want to recalculate the list
  useEffect(() => {
    ingList = [];
    resourceCount = [];

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
    let maxOutput = Infinity;
    resources.forEach((resource) => {
      let resourceAmount = 0;
      rawResources.forEach((rawResource) => {
        if (rawResource.Name == resource) {
          resourceAmount = rawResource.Amount;
        }
      });

      if (resourceAmount > 0) {
        let ipm = getResourceAmount(resource) / resourceAmount;
        if (ipm < maxOutput) {
          maxOutput = ipm;
        }
      }
    });

    setMaxItemPerMin(Number((maxOutput * amount).toFixed(4)));
  }, [
    rawResources,
    woodExtractorAmount,
    stoneExtractorAmount,
    ironExtractorAmount,
    copperExtractorAmount,
    wolframiteExtractorAmount,
    coalExtractorAmount,
  ]);

  const addIng = (
    name: string,
    amount: number,
    depth: number,
    numberOfBuildings: number,
    building: string
  ) => {
    // Add to the sum list
    var itemInArray = false;
    resourceCount.forEach((element) => {
      if (element.Name == name) {
        element.Amount += amount;
        itemInArray = true;
      }
    });

    if (!itemInArray) {
      resourceCount.push({
        Name: name,
        Amount: amount,
        Building: building,
      });
    }

    ingList.push({
      name: name,
      amount: amount,
      depth: depth,
      numberOfBuildings: +(numberOfBuildings.toFixed(2)),
      building: building,
    });
  };

  function extractorOutput(level: number) {
    switch (level) {
      case 1:
        return 7.5;
      case 2:
        return 11.25;
      case 3:
        return 15;
      case 4:
        return 22.5;
      case 5:
        return 30;
      default:
        return 7.5;
    }
  }

  function getResourceAmount(name: string) {
    let outputPerExtractor = Number(
      extractorOutput(getBuildingLevel("extractor"))
    );
    switch (name.toLowerCase()) {
      case "wood log":
        return outputPerExtractor * woodExtractorAmount;
      case "stone":
        return outputPerExtractor * stoneExtractorAmount;
      case "iron ore":
        return outputPerExtractor * ironExtractorAmount;
      case "copper ore":
        return outputPerExtractor * copperExtractorAmount;
      case "wolframite":
        return outputPerExtractor * wolframiteExtractorAmount;
      case "coal":
        return outputPerExtractor * coalExtractorAmount;
      default:
        return 0;
    }
  }

  function getBuildingLevel(name: string) {
    switch (name.toLowerCase()) {
      case "workshop":
        return workshopLevel;
      case "furnace":
        return furnaceLevel;
      case "machine shop":
        return machineShopLevel;
      case "industrial factory":
        return industrialFactoryLevel;
      case "forge":
        return forgeLevel;
      case "manufacturer":
        return manufacturerLevel;
      case "extractor":
        return extractorLevel;
      case "earth transporter":
        return 1;
      default:
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
      case 5:
        return 4;
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

      const numberOfBuildings = +((
        requireAmountPerMin / (7.5 * multiplier)
      ).toFixed(2));

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

  function renderList() {
    return (
      <View style={{ alignItems: "flex-start" }}>
        {ingredients.map((data) => {
          if (data.amount == 0) {
            return null;
          }
          return (
            <Text style={{ paddingLeft: data.depth * 10 }}>
              {data.amount.toFixed(2)} {data.name} ({data.numberOfBuildings}{" "}
              {data.building}, {(data.amount / beltIPM).toFixed(2)} belts out)
            </Text>
          );
        })}
      </View>
    );
  }

  function renderTopologicalView() {
    let dag = new Map<string, Resources[]>();
    let stack: string[] = [];

    ingredients.forEach((data) => {
      if (!dag.has(data.name)) {
        dag.set(data.name, []);
      }

      while (data.depth < stack.length) {
        stack.pop();
      }

      if (stack.length > 0) {
        let last = stack[stack.length - 1];
        let dependencies = dag.get(last)!;

        let dep = dependencies.find((dep) => dep.Name == data.name);

        if (dep === undefined) {
          dependencies.push({Name: data.name, Amount: data.amount, Building: ''});
        } else {
          dep.Amount += data.amount;
        }
      }

      stack.push(data.name);
    });

    let order: string[] = [];

    function dfs(node: string) {
      if (order.findIndex((name) => name === node) !== -1) {
        return;
      }

      let dependencies = dag.get(node)!;

      dependencies.forEach((dependency) => {
        dfs(dependency.Name);
      });

      order.push(node);
    }

    dfs(ingredients[0].name);
    order = order.reverse();

    return (
      <View style={{ alignItems: "flex-start" }}>
        {
          order.map((name) => {
            let data = rawResources.find((resource) => resource.Name == name)!;
            // The amount of items that a single building can produce (at level 1)
            var itemsPerMin = 0;

            if (resources.includes(data.Name)) {
              itemsPerMin = 7.5;
            } else {
              const ingInfo = allItems.find((item) => {
                return item.name == data.Name;
              });
              itemsPerMin = ingInfo!.itemsPerMin;
            }

            // Account for building levels increasing output
            const buildingLevel = getBuildingLevel(data.Building);
            const multiplier = levelMultiplier(buildingLevel!);
            const numberOfBuildings = data.Amount / (itemsPerMin * multiplier);

            let dependencies = dag.get(name)!.map((dep) => {
              let resource = rawResources.find((resource) => resource.Name == dep.Name)!;
              let percent = dep.Amount / resource.Amount * 100;

              return (<Text style={{paddingLeft:20}}>
                {dep.Name}: {dep.Amount.toFixed(2)} ({percent.toFixed(2)}%, {(dep.Amount / beltIPM).toFixed(2)} belts in)
              </Text>);
            });

            return (
              <>
              <Text>
                {data.Name}: {data.Amount.toFixed(2)} (
                {(numberOfBuildings.toFixed(2))} {data.Building}, {(data.Amount / beltIPM).toFixed(2)} belts out)
              </Text>
              {dependencies}
              <Text>{' '}</Text>
              </>
            );
          })
          }
      </View>
    );
  }

  // We should give these elements an id
  function renderSummaryView() {
    return (
      <View style={{ alignItems: "flex-start" }}>
        {rawResources
          .sort((a, b) => {
            return a.Name.localeCompare(b.Name);
          })
          .map((data) => {
            // The amount of items that a single building can produce (at level 1)
            var itemsPerMin = 0;

            if (resources.includes(data.Name)) {
              itemsPerMin = 7.5;
            } else {
              const ingInfo = allItems.find((item) => {
                return item.name == data.Name;
              });
              itemsPerMin = ingInfo!.itemsPerMin;
            }

            // Account for building levels increasing output
            const buildingLevel = getBuildingLevel(data.Building);
            const multiplier = levelMultiplier(buildingLevel!);
            const numberOfBuildings = data.Amount / (itemsPerMin * multiplier);
            return (
              <Text>
                {data.Name}: {data.Amount.toFixed(2)} (
                {(numberOfBuildings.toFixed(2))} {data.Building})
              </Text>
            );
          })}
      </View>
    );
  }

  function enterTotalExtractorAmount() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 5,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <NumericInput
          title={"Wood Extractors"}
          width={100}
          height={30}
          value={woodExtractorAmount.toString()}
          onChange={(value: number) => {
            setWoodExtractorAmount(value);
          }}
          max={1000}
        />
        <NumericInput
          title={"Stone Extractors"}
          width={100}
          height={30}
          value={stoneExtractorAmount.toString()}
          onChange={(value: number) => {
            setStoneExtractorAmount(value);
          }}
          max={1000}
        />
        <NumericInput
          title={"Copper Extractors"}
          width={100}
          height={30}
          value={copperExtractorAmount.toString()}
          onChange={(value: number) => {
            SetCopperExtractorAmount(value);
          }}
          max={1000}
        />
        <NumericInput
          title={"Iron Extractors"}
          width={100}
          height={30}
          value={ironExtractorAmount.toString()}
          onChange={(value: number) => {
            setIronExtractorAmount(value);
          }}
          max={1000}
        />
        <NumericInput
          title={"Coal Extractors"}
          width={100}
          height={30}
          value={coalExtractorAmount.toString()}
          onChange={(value: number) => {
            setCoalExtractorAmount(value);
          }}
          max={1000}
        />
        <NumericInput
          title={"Wolframite Extractors"}
          width={100}
          height={30}
          value={wolframiteExtractorAmount.toString()}
          onChange={(value: number) => {
            setWolframiteExtractorAmount(value);
          }}
          max={1000}
        />
        <NumericInput
          title={"Belt Items/Min"}
          width={100}
          height={30}
          value={beltIPM.toString()}
          onChange={(value: number) => {
            setBeltIPM(value);
          }}
          max={1000}
        />
      </View>
    );
  }
  if (!isLoading) {
    let productionView;

    switch (treeView) {
      case 'topological':
        productionView = renderTopologicalView();
        break;
      case 'summary':
        productionView = renderSummaryView();
        break;
      default:
        productionView = renderList();
        break;
    }

    return (
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 5,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <NumericInput
            title={"Extractor"}
            width={100}
            height={30}
            value={extractorLevel.toString()}
            onChange={(value: number) => {
              setExtractorLevel(value);
            }}
            max={5}
          />
          <NumericInput
            title={"Workshop"}
            width={100}
            height={30}
            value={workshopLevel.toString()}
            onChange={(value: number) => {
              setWorkShopLevel(value);
            }}
            max={4}
          />
          <NumericInput
            title={"Furnace"}
            width={100}
            height={30}
            value={furnaceLevel.toString()}
            onChange={(value: number) => {
              setFurnaceLevel(value);
            }}
            max={4}
          />
          <NumericInput
            title={"Machine Shop"}
            width={100}
            height={30}
            value={machineShopLevel.toString()}
            onChange={(value: number) => {
              setMachineShopLevel(value);
            }}
            max={4}
          />
          <NumericInput
            title={"Industrial Factory"}
            width={100}
            height={30}
            value={industrialFactoryLevel.toString()}
            onChange={(value: number) => {
              setIndustrialFactoryLevel(value);
            }}
            max={4}
          />
          <NumericInput
            title={"Forge"}
            width={100}
            height={30}
            value={forgeLevel.toString()}
            onChange={(value: number) => {
              setForgeLevel(value);
            }}
            max={4}
          />
          <NumericInput
            title={"Manufacturer"}
            width={100}
            height={30}
            value={manufacturerLevel.toString()}
            onChange={(value: number) => {
              setManufacturerLevel(value);
            }}
            max={4}
          />
        </View>
        {enterTotalExtractorAmount()}

        <View style={{ alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              justifyContent: "center",
            }}
          >
            <View>
              <Text>Max Output</Text>
              <TouchableOpacity
                style={{
                  height: 45,
                  width: 100,
                  borderColor: "black",
                  borderRadius: 5,
                  borderWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => setAmount(maxItemPerMin)}
              >
                <Text style={{ fontSize: 8 }}>(Press Me)</Text>
                <Text>{maxItemPerMin.toFixed(2)}</Text>
              </TouchableOpacity>
            </View>
            <NumericInput
              title={"Items/Min"}
              width={125}
              height={45}
              value={amount.toString()}
              onChange={(value: number) => {
                setAmount(value);
              }}
              max={10000}
              min={0}
              showButtons={false}
              updateOnStateChange={true}
              allowDecimal={true}
            />

            <Picker
              style={{
                width: 100,
                padding: 5,
                borderWidth: 1,
                borderColor: "#666",
                borderRadius: 5,
                height: 40,
              }}
              selectedValue={currentItem}
              onValueChange={(itemValue, itemIndex) =>
                setCurrentItem(itemValue)
              }
              itemStyle={{
                borderColor: "red",
                borderWidth: 2,
                borderRadius: 5,
              }}
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

        <View
          style={{
            flexDirection: "row",
            width: 500,
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              height: 50,
              width: "25%",
              borderColor: "black",
              borderRadius: 5,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: treeView === 'tree' ? "#D3D3D3" : "white",
            }}
            onPress={() => {
              setTreeView('tree');
            }}
          >
            <Text style={{ padding: 5 }}>Tree View</Text>
          </TouchableOpacity>
          <View style={{ width: 5 }} />
          <TouchableOpacity
            style={{
              height: 50,
              width: "25%",
              borderColor: "black",
              borderRadius: 5,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: treeView === 'summary' ? "#D3D3D3" : "white",
            }}
            onPress={() => {
              setTreeView('summary');
            }}
          >
            <Text style={{ padding: 5 }}>Summary View</Text>
          </TouchableOpacity>
          <View style={{ width: 5 }} />
          <TouchableOpacity
            style={{
              height: 50,
              width: "25%",
              borderColor: "black",
              borderRadius: 5,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: treeView === 'topological' ? "#D3D3D3" : "white",
            }}
            onPress={() => {
              setTreeView('topological');
            }}
          >
            <Text style={{ padding: 5 }}>Topological View</Text>
          </TouchableOpacity>
        </View>
        { productionView }
        <View style={{ height: 50 }} />
      </View>
    );
  } else {
    return null;
  }
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
  inputContainer: {
    lexDirection: "row",
    alignItems: "center",
    padding: 5,
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
