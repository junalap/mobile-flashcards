import { DECKS_RECEIVED, DECK_RECEIVED, QUESTION_RECEIVED, QUESTIONS_RECEIVED } from '../actions/index';

export default function decks(state = {}, action) {
  switch(action.type) {
    case DECKS_RECEIVED:
      return { ...state, ...action.decks }
    case DECK_RECEIVED:
      const { deck } = action;

      return {
        ...state,
        [deck.id]: deck
      };
    case QUESTIONS_RECEIVED:
      const { questions } = action;

      const updatedDeck = Object.values(questions).reduce((deck, question) => {
        deck[question.deckId].questionIds.push(question.id);

        return deck;
      }, {...state});

      return updatedDeck;
    case QUESTION_RECEIVED:
      const { question } = action;

      return {
        ...state,
        [question.deckId]: {
          ...state[question.deckId],
          questionIds: state[question.deckId].questionIds.concat(question.id)
        }
      }
    default:
      return state;
  }
};
