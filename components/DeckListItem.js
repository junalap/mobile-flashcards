import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const DeckListItem = props => {
  const { deck, navigate } = props;

  return (
    <TouchableOpacity
      style={styles.deckListItem}
      onPress={() => { navigate('Deck', { deckId: deck.id }) } }
    >
      <Text>{deck.title}</Text>
      <Text>{deck.questionIds && `${deck.questionIds.length} cards`}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  deckListItem: {
    padding: 30,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#f4511e',
    width: 250,
  },
  red: {
    color: 'red',
  },
});

export default DeckListItem;
