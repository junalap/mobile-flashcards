import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';

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
    const { deck } = this.props;
    const { navigate } = this.props.navigation;

    return (
      <View>
        <Text>Title: {`${deck.title}`}</Text>
        <Text>{deck.questionIds.length} questions</Text>
        <Button title='Start Quiz' onPress={this.startQuiz}/>
        <Button title='Add Card' onPress={() => navigate('AddQuestion', { deckId: deck.id})}/>
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
    deckId,
    deck,
    questions
  }
}

const mapDispatchToProps = (dispatch) => ({
  addQuestion: question => dispatch(addQuestion(question))
});

export default connect(mapStateToProps, mapDispatchToProps)(Deck)
