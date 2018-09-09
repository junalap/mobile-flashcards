import { QUESTION_RECEIVED, QUESTIONS_RECEIVED } from '../actions/index';

export default function questions(state = {}, action) {
  switch(action.type) {
    case QUESTIONS_RECEIVED:
      // console.log('questions', action.questions)
      return { ...state, ...action.questions }
    case QUESTION_RECEIVED:
      const { question } = action;

      return {
        ...state,
        [question.id]: question
      }
    default:
      return state;
  }
};
