import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

const DeckListItem = ({ deck }) => {
  return (
    <View style={styles.deckListItem}>
      <Text>{deck.title}</Text>
      <Text>{deck.questions && `${deck.questions.length} cards`}</Text>
    </View>
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
