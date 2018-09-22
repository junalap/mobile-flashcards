import React, { Component, Fragment } from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
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
      <View style={styles.container}>
        {questions.length && !complete &&
          <View style={{alignSelf: 'stretch', flex: 1, alignItems: 'center'}}>
            <Text style={{alignSelf: 'flex-start'}}>{currentQuestionIndex + 1}/{questions.length}</Text>
            <Card question={questions[currentQuestionIndex]} answerVisible={answerVisible} showAnswer={this.showAnswer} onAnswer={this.onAnswer}/>
          </View>

        }
        {complete &&
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 35}}>Congratulations!</Text>
            <Text style={{fontSize: 15}}>You've completed a quiz!</Text>
            <Text style={{fontSize: 10, marginTop: 5}}>Score: {(100 * correctCount/questions.length).toFixed(2)}%</Text>
            <TouchableOpacity style={styles.button} onPress={() => this.props.startQuiz(this.props.questions) }>
              <Text>Re-take Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigate('Deck', { deckId: this.props.deckId }) }>
              <Text>Deck View</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingLeft: 20,
    paddingRight: 20
  },
  button: {
    marginTop: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray'
  }
});

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
