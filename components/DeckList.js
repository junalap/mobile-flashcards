import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate({routeName: 'AddDeck'})}
          >
            <Text>Create New Deck</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.scrollViewContainer}>
          <ScrollView style={styles.list}>
            {Object.keys(decks).map((key, i) => (
              <DeckListItem key={i} deck={decks[key]} navigate={navigate} />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  };
};

const mapStateToProps = ({ decks }) => ({ decks });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollViewContainer: {
    flex: 1,
    alignSelf: 'stretch',
    borderTopWidth: 1,
    marginTop: 10
  },
  button: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15,
    paddingTop: 15,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10
  }
});

export default connect(mapStateToProps)(DeckList);
