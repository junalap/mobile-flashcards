import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import CreateQuestion from './CreateQuestion';
import { addQuestion } from '../actions/index';

class Questions extends Component {
  render() {
    const { deckId, questions } = this.props;

    return (
      <View>
        <CreateQuestion deckId={deckId} addQuestion={addQuestion} />
        <Text>Questions list</Text>
        {questions.map((question, i) => (
          <Text key={i}>{question.id}</Text>
        ))}
      </View>
    )
  }
}

export default Questions;
