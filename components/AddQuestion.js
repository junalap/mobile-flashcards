import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Text, View } from 'react-native';
import CreateQuestion from './CreateQuestion';
import { addQuestion } from '../actions/index';

class AddQuestion extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { deckId, addQuestion } = this.props;

    return (
      <CreateQuestion deckId={deckId} addQuestion={addQuestion}/>
    )
  };
};

const mapStateToProps = (state, props) => {
  const deckId = props.navigation.getParam('deckId');

  return {
    deckId
  };
};

const mapDispatchToProps = (dispatch) => ({
  addQuestion: (question) => {
    dispatch(addQuestion(question))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);
