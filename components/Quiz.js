import React, { Component, Fragment } from 'react';
import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Card from './Card';
import { questionAnswered, showAnswer, startQuiz } from '../actions/quiz';
import { getQuestionsForDeck } from '../utils/StateHelper';

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
    this.props.onAnswer(answeredCorrectly);
  }

  render() {
    const { currentQuestionIndex, complete, correctCount, answerVisible } = this.props;
    const questions = Object.values(this.props.questions);
    const { navigate } = this.props.navigation;

    return <View>
      <Text>QUIZ</Text>
      {questions.length && !complete &&
        <Fragment>
          <Text>{currentQuestionIndex + 1}/{questions.length}</Text>
          <Card question={questions[currentQuestionIndex]} answerVisible={answerVisible} showAnswer={this.showAnswer} onAnswer={this.onAnswer}/>
        </Fragment>

      }
      {complete &&
        <Fragment>
          <Text>I've been completed, correct count: {correctCount}</Text>
          {/* create utility function that takes state and deckId and return functions, this is getting ridiculous */}

          {/* <Button title='Start Over' onPress={() => navigate('Q') }/> */}
          <Button title='Deck View' onPress={() => navigate('Deck', { deckId: this.props.deckId }) }/>
        </Fragment>
      }
    </View>
  }
};

const mapStateToProps = (state, props) => {
  console.log('state', state);
  console.log('props', props);
  // I can always get questions form state if I have a deckId over here
  // So I don't need to pass questions around in params
  // create a utility function

  // get the questions from state over here
  //

  // dispatch startQuiz on component mount in order get the inialized quiz state values
  debugger

  const { currentQuestionIndex, correctCount, complete, answerVisible } = state.quiz;
  const deckId = state.quiz.deckId || props.navigation.getParam('deckId');
  const questions = getQuestionsForDeck(deckId, state)

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
    onAnswer: (answeredCorrectly) => dispatch(questionAnswered(answeredCorrectly))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
