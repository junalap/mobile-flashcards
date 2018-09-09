import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';
import CreateQuestion from './CreateQuestion';
import { addQuestion } from '../actions/index';

class Deck extends Component {
  static navigationOptions = {
    title: "Deck"
  }

  constructor(props) {
    super(props);
    this.startQuiz = this.startQuiz.bind(this);
  }

  startQuiz() {
    this.props.navigation.navigate('Quiz',{ deckId: this.props.deckId })
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
  debugger
  const questions = deck.questionIds.reduce((questionList, questionId) => {
    questionList.push(state.questions[questionId]);
    return questionList;
  }, []);

  return {
    deckId,
    deck,
    questions
  }
}

const mapDispatchToProps = (dispatch) => ({
  addQuestion: question => dispatch(addQuestion(question))
});

export default connect(mapStateToProps, mapDispatchToProps)(Deck)
