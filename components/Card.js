import React, { Component, Fragment } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class Card extends Component {
  // question
  // showAnswer
  // onCorrectAnswer
  // onIncorrectAnswer


  constructor(props) {
    super(props);
  }

  render() {
    const { question, onAnswer, answerVisible, showAnswer } = this.props;

    // return <Text>What up</Text>
    return (
      <View style={styles.card}>
        <Text>{question.question}</Text>
        {!answerVisible && <Button title='Show Answer' onPress={showAnswer} />}
        {answerVisible &&
          <Fragment>
            <Text>Answer: {question.answer}</Text>
            <Button title='Correct' onPress={() => onAnswer(true)} />
            <Button title='Incorrect' onPress={() => onAnswer(false)} />
          </Fragment>
        }
      </View>
    )
  }
};

const styles = StyleSheet.create({
  card: {
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
