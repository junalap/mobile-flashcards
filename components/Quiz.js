import React, { Component, Fragment } from 'react';
import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Card from './Card';
import { questionAnswered, showAnswer, startQuiz, quizComplete } from '../actions/quiz';
import { getQuestionsByDeckId } from '../utils/StateHelper';

class Quiz extends Component {
  static navigationOptions = {
    title: "All Decks"
  }

  constructor(props) {
    super(props);
    this.onAnswer = this.onAnswer.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
  }

  componentDidMount() {
    this.props.startQuiz(this.props.questions);
  }

  showAnswer() {
    this.props.showAnswer();
  }

  onAnswer(answeredCorrectly) {
    const { onAnswer, onQuizComplete, currentQuestionIndex, questions } = this.props;

    if (currentQuestionIndex === Object.values(questions).length - 1) { onQuizComplete() }
    onAnswer(answeredCorrectly);
  }

  render() {
    const { currentQuestionIndex, complete, correctCount, answerVisible } = this.props;
    const questions = Object.values(this.props.questions);
    const { navigate } = this.props.navigation;

    return (
      <View>
        <Text>QUIZ</Text>
        {questions.length && !complete &&
          <Fragment>
            <Text>{currentQuestionIndex + 1}/{questions.length}</Text>
            <Card question={questions[currentQuestionIndex]} answerVisible={answerVisible} showAnswer={this.showAnswer} onAnswer={this.onAnswer}/>
          </Fragment>

        }
        {complete &&
          <Fragment>
            <Text>Quiz Complete! Success Rate: {(100 * correctCount/questions.length).toFixed(2)}%</Text>
            <Button title='Re-take Quiz' onPress={() => this.props.startQuiz(this.props.questions) }/>
            <Button title='Deck View' onPress={() => navigate('Deck', { deckId: this.props.deckId }) }/>
          </Fragment>
        }
      </View>
    )
  }
};

const mapStateToProps = (state, props) => {
  const { currentQuestionIndex, correctCount, complete, answerVisible } = state.quiz;
  const deckId = props.navigation.getParam('deckId');
  const questions = getQuestionsByDeckId(deckId, state)

  return {
    deckId,
    questions,
    currentQuestionIndex,
    correctCount,
    complete,
    answerVisible,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startQuiz: (questions) => {
      dispatch(startQuiz(questions))
    },
    showAnswer: () => dispatch(showAnswer()),
    onAnswer: (answeredCorrectly) => dispatch(questionAnswered(answeredCorrectly)),
    onQuizComplete: () => dispatch(quizComplete())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
