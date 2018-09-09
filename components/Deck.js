import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';
import CreateQuestion from './CreateQuestion';
import { addQuestion } from '../actions/index';
import { startQuiz } from '../actions/quiz';

class Deck extends Component {
  static navigationOptions = {
    title: "Deck"
  }

  constructor(props) {
    super(props);
    this.startQuiz = this.startQuiz.bind(this);
  }

  startQuiz() {
    this.props.startQuiz(this.props.questions)
    this.props.navigation.navigate('Quiz')
  }

  render() {
    const { deck, addQuestion } = this.props;

    return (
      <View>
        <Text>Title: {`${deck.title}`}</Text>
        <CreateQuestion deckId={deck.id} addQuestion={addQuestion} />
        <Button title='Start Quiz' onPress={this.startQuiz}/>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  const deckId = props.navigation.getParam('deckId');
  const deck = state.decks[deckId];
  const questions = deck.questionIds.reduce((questionList, questionId) => {
    questionList.push(state.questions[questionId]);
    return questionList;
  }, []);

  return {
    deck,
    questions
  }
}

const mapDispatchToProps = (dispatch) => ({
  startQuiz: questions => dispatch(startQuiz(questions)),
  addQuestion: question => dispatch(addQuestion(question))
});

export default connect(mapStateToProps, mapDispatchToProps)(Deck)