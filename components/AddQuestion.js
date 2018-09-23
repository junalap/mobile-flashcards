import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateQuestion from './CreateQuestion';
import { addQuestion } from '../actions/index';

class AddQuestion extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.getParam('deckTitle')}: Add card`
    }
  }

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

const mapStateToProps = (state, props) => ({ deckId: props.navigation.getParam('deckId') });

const mapDispatchToProps = (dispatch) => ({
  addQuestion: (question) => {
    dispatch(addQuestion(question))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);
