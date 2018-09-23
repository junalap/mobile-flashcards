import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

class CreateQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      answer: ''
    }
    this.addQuestion = this.addQuestion.bind(this);
  }

  addQuestion() {
    const { deckId, addQuestion } = this.props;
    addQuestion({...this.state, deckId});
    this.setState({ question: '', answer: '' });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Question</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.setState({...this.state, question: text})}
          value={this.state.question}
        />
        <Text>Answer</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.setState({...this.state, answer: text})}
          value={this.state.answer}
        />
        <TouchableOpacity style={styles.button} onPress={this.addQuestion}>
          <Text>
            Add Card
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 25,
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'stretch',
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    padding: 10
  },
  button: {
    marginTop: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderRadius: 10
  }
});

export default CreateQuestion;
