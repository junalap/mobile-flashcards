import React from 'react';
import { AsyncStorage, StyleSheet, ScrollView, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import DeckList from './components/DeckList';

const RootStack = createStackNavigator(
  {
    Home: DeckList
  },
  {
    initialRoute: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e'
      },
      headerTintColor: '#fff',
    }
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
