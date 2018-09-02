import { DECKS_RECEIVED, DECK_RECEIVED } from '../actions/index';

const initialState = {
  decks: {},
  questions: {}
}

export default function reducer(state = initialState, action) {
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
    default:
      return state;
  }
};
