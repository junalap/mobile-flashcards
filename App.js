import React from 'react';
import { Provider, connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import store from './store';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';

import { requestDecks } from './actions/index';

const RootStack = createStackNavigator(
  {
    Home: DeckList,
    AddDeck: AddDeck
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

export default function AppContainer() {
  return <Provider store={store}><ConnectedApp /></Provider>
}
