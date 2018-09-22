import React, { Component } from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import DeckListItem from './DeckListItem';

class DeckList extends Component {
  static navigationOptions = {
    title: "Decks"
  }

  render() {
    const decks = this.props.decks;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Button
          onPress={() => navigate({routeName: 'AddDeck'})}
          title="Create New Deck"
        />
        <ScrollView>
          {Object.keys(decks).map((key, i) => (
            <DeckListItem key={i} deck={decks[key]} navigate={navigate} />
          ))}
        </ScrollView>
      </View>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    decks: state.decks
  }
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default connect(mapStateToProps)(DeckList);
