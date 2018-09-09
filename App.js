import React from 'react';
import { Provider, connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import NavigationService from './utils/NavigationService';
import store from './store';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import Deck from  './components/Deck';
import Quiz from './components/Quiz';
import AddQuestion from './components/AddQuestion';

import { requestDecks, requestQuestions } from './actions/index';

const RootStack = createStackNavigator(
  {
    Home: DeckList,
    AddDeck,
    Deck,
    Quiz,
    AddQuestion
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
    this.props.dispatch(requestQuestions());
  }

  render() {
    return (
      <RootStack
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
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
