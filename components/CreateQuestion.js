import React, { Component } from 'react';
import { Button, View, Text, TextInput } from 'react-native';

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

    this.setState({ question: '', answer: '' })
  }

  render() {


    return (
      <View>
        <Text>Question</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={text => this.setState({...this.state, question: text})}
          value={this.state.question}
        />
        <Text>Answer</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={text => this.setState({...this.state, answer: text})}
          value={this.state.answer}
        />
        <Button
          onPress={this.addQuestion}
          title='Add Card'
        />
      </View>
    )
  }
}

export default CreateQuestion;
