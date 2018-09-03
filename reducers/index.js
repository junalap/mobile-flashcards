import { DECKS_RECEIVED, DECK_RECEIVED, QUESTION_RECEIVED, QUESTIONS_RECEIVED } from '../actions/index';

const initialState = {
  decks: {},
  questions: {}
}

export default function reducer(state = initialState, action) {
  console.log(action.type);
  switch(action.type) {
    case DECKS_RECEIVED:
      return { ...state, decks: action.decks }
    case DECK_RECEIVED:
      const { deck } = action;

      return {
        ...state,
        decks: {
          ...state.decks,
          [deck.id]: deck
        }
      }
    case QUESTIONS_RECEIVED:
      return { ...state, questions: action.questions }
    case QUESTION_RECEIVED:
      const { question } = action;
      const parentDeck = state.decks[question.deckId];

      return {
        ...state,
        decks: {
          ...state.decks,
          [parentDeck.id]: {
            ...parentDeck,
            questionIds: parentDeck.questionIds.concat(question.id)
          }
        },
        questions: {
          ...state.questions,
          [question.id]: question
        }
      }
    default:
      return state;
  }
};
