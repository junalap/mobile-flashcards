import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const DeckListItem = props => {
  const { deck, navigate } = props;

  return (
    <TouchableOpacity
      style={styles.deckListItem}
      onPress={() => { navigate('Deck', { deckId: deck.id }) }}
    >
      <Text style={{fontSize: 40 }}>{deck.title}</Text>
      <Text>{deck.questionIds && `${deck.questionIds.length} cards`}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  deckListItem: {
    padding: 30,
    borderBottomWidth: 1,
    borderColor: 'gray',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },
  red: {
    color: 'gray',
  },
});

export default DeckListItem;
