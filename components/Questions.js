import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Questions extends Component {
  render() {
    const { questions } = this.props;

    return (
      <View>
        <Text>Questions list</Text>
        {questions.map((question, i) => (
          <Text key={i}>{question.id}</Text>
        ))}
      </View>
    )
  }
}

export default Questions;
