import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import DeckListItem from './DeckListItem';

class DeckList extends Component {
  static navigationOptions = {
    title: "All Decks"
  }

  render() {
    const decks = this.props.decks;

    return (
      <ScrollView>
        {Object.keys(decks).map((key, i) => (
          <DeckListItem key={i} deck={decks[key]} />
        ))}
      </ScrollView>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    decks: state.decks
  }
}

export default connect(mapStateToProps)(DeckList);
