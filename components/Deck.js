import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Questions from './Questions';

class Deck extends Component {
  static navigationOptions = {
    title: "Deck"
  }

  render() {
    const { deck, questions } = this.props;

    return (
      <View>
        <Text>Title: {`${deck.title}`}</Text>
        <Questions questions={questions} deckId={deck.id}/>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  const deckId = props.navigation.getParam('deckId');
  const deck = state.decks[deckId];
  const questions = deck.questionIds.reduce((questionList, questionId) => {
    questionList.push(this.state.questions[questionId]);
    return questionList;
  }, [])
  return {
    deck,
    questions
  }
}

export default connect(mapStateToProps)(Deck)
