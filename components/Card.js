import React, { Component, Fragment } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Answer = ({ question, onAnswer }) => (
  <View style={styles.answer}>
    <Text style={styles.answerText}>Answer: {question.answer}</Text>
    <View style={styles.buttonGroup}>
      <TouchableOpacity style={styles.button} title='Correct' onPress={() => onAnswer(true)}>
        <Text style={styles.buttonText}>Correct</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} title='Incorrect' onPress={() => onAnswer(false)}>
        <Text style={styles.buttonText}>Incorrect</Text>
      </TouchableOpacity>
    </View>
  </View>
)

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { question, onAnswer, answerVisible, showAnswer } = this.props;

    return (
      <View style={styles.card}>
        <View style={styles.question}><Text style={styles.questionText}>{question.question}</Text></View>

        {!answerVisible &&
          <TouchableOpacity style={styles.showAnswerButton} title='Show Answer' onPress={showAnswer}>
            <Text>Show Answer</Text>
          </TouchableOpacity>
        }
        {answerVisible && <Answer onAnswer={onAnswer} question={question}/>
        }
      </View>
    )
  }
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1
  },
  question: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
  questionText: {
    fontSize: 30
  },
  showAnswerButton: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    justifyContent: 'center'
  },
  answer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  answerText: {
    fontSize: 20
  },
  buttonGroup: {

  },
  button: {
    borderWidth: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 10,
    marginTop: 15
  },
  buttonText: {
    fontSize: 20
  }
});
