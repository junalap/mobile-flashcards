import React, { Component } from 'react';
import { Text, TextInput, View, Button } from 'react-native'
import { connect } from 'react-redux';
import { addDeck } from '../actions/index';

class AddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Create Deck Title'}
  }
  render() {
    return (
      <View>
        <Text>
          Add Deck View
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
          onPress={() => this.props.dispatch(addDeck(this.state.text))}
          title='Create New Deck'
        />
      </View>
    );
  }
}



export default connect()(AddDeck);
