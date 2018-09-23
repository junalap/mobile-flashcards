import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux';
import { addDeck } from '../actions/index';

class AddDeck extends Component {
  static navigationOptions = {
    title: "Create New Deck"
  }

  constructor(props) {
    super(props);
    this.state = { text: null }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.prompt}>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder={'Deck Title'}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.dispatch(addDeck(this.state.text))}
        >
          <Text>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center'
  },
  prompt: {
    fontSize: 45
  },
  textInput: {
    marginTop: 25,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    alignSelf: 'stretch'
  },
  button: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    marginTop: 15
  }
});

export default connect()(AddDeck);
