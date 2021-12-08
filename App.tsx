import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tree from 'react-d3-tree';

const orgChart = {
  name: 'CEO',
  children: [
    {
      name: 'Manager',
      attributes: {
        department: 'Production',
      },
      children: [
        {
          name: 'Foreman',
          attributes: {
            department: 'Fabrication',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
        {
          name: 'Foreman',
          attributes: {
            department: 'Assembly',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
      ],
    },
  ],
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text>The first step is here</Text>
      <View style={{borderColor: 'red', borderWidth: 10, width: '100%', height: '50%'}}>
        <Tree data={orgChart} orientation={'vertical'} translate={{x: 500, y:250}} collapsible={false}/>
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
