import React, { Component } from 'react';
import { Button, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import DeckListItem from './DeckListItem';

class DeckList extends Component {
  static navigationOptions = {
    title: "All Decks"
  }

  render() {
    const decks = this.props.decks;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <ScrollView styles={styles.scrollView}>
          {Object.keys(decks).map((key, i) => (
            <DeckListItem key={i} deck={decks[key]} navigate={navigate} />
          ))}
        </ScrollView>
        <Button
          onPress={() => navigate({routeName: 'AddDeck'})}
          title="Add Deck"
          color="#841584"
        />
      </View>

    )
  }
};

const mapStateToProps = (state) => {
  return {
    decks: state.decks
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row'
  }
}

export default connect(mapStateToProps)(DeckList);
