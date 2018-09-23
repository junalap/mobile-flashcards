import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';

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
      <View style={styles.container}>
        <View style={styles.deckInfo}>
          <Text style={styles.title}>{`${deck.title}`}</Text>
          <Text style={styles.cardCount}>{deck.questionIds.length} questions</Text>
        </View>
        <View style={styles.buttonGroup}>
            {deck.questionIds.length && <TouchableOpacity style={styles.button} onPress={this.startQuiz}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>}
          <TouchableOpacity style={styles.button} onPress={() => navigate('AddQuestion', { deckId: deck.id})}>
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  deckInfo: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonGroup: {
    flex: 3
  },
  title: {
    fontSize: 40
  },
  button: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginTop: 10
  },
  buttonText: {
    fontSize: 15
  }
})

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
