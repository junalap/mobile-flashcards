import React from 'react';
import { Provider, connect } from 'react-redux';
import { AsyncStorage, StyleSheet, ScrollView, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import store from './store';
import DeckList from './components/DeckList';
import { requestDecks } from './actions/index';

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

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(requestDecks());
  }

  render() {
    console.log(this.props)
    return <RootStack />
  }
};

const mapStateToProps = (state) => {
  return {
    decks: state.decks,
    questions: state.questions
  }
}

const ConnectedApp = connect(mapStateToProps)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default function AppContainer() {
  return <Provider store={store}><ConnectedApp /></Provider>
}
