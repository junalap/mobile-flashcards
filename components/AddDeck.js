import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { addDeck } from '../actions/index';

class AddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Deck Title' }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 45}}>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.props.dispatch(addDeck(this.state.text))}>
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
