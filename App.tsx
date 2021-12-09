import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tree from 'react-d3-tree';



const buildTree = {
  name: "item",
  children: [
    {
      name: "child",
      children: []
    }
  ]
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>The first step is here</Text>
      <View style={{borderColor: 'red', borderWidth: 10, width: '100%', height: '50%'}}>
        <Tree data={buildTree} orientation={'vertical'} translate={{x: 500, y:250}} collapsible={false}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '50%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
