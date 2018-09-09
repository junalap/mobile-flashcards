import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import Card from './Card';
import { questionAnswered, showAnswer } from '../actions/quiz';

class Quiz extends Component {
  static navigationOptions = {
    title: "All Decks"
  }

  constructor(props) {
    super(props);
    this.onAnswer = this.onAnswer.bind(this)
    this.showAnswer = this.showAnswer.bind(this)
  }

  showAnswer() {
    this.props.dispatch(showAnswer());
  }

  onAnswer(answeredCorrectly) {
    this.props.dispatch(questionAnswered(answeredCorrectly));
  }

  render() {
    const { questions, currentQuestionIndex, complete, correctCount, answerVisible } = this.props;

    return <View>
      <Text>Yo, im a quiz</Text>
      {questions.length && !complete && <Card question={questions[currentQuestionIndex]} answerVisible={answerVisible} showAnswer={this.showAnswer} onAnswer={this.onAnswer}/>}
      {complete && <Text>I've been completed, correct count: {correctCount}</Text>}
    </View>
  }
};

const mapStateToProps = (state, props) => {
  const { questions, currentQuestionIndex, correctCount, complete, answerVisible } = state.quiz;

  return {
    questions,
    currentQuestionIndex,
    correctCount,
    complete,
    answerVisible
  }
}

export default connect(mapStateToProps)(Quiz);
