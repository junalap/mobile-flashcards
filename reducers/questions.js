import { DECKS_RECEIVED, DECK_RECEIVED, QUESTION_RECEIVED, QUESTIONS_RECEIVED } from '../actions/index';

export default function questions(state = {}, action) {
  console.log(action.type);
  switch(action.type) {
    case QUESTIONS_RECEIVED:
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
