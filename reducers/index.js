import { DECKS_RECEIVED } from '../actions/index';

const initialState = {
  decks: {},
  questions: {}
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case DECKS_RECEIVED:
      return { ...state, decks: action.decks }
    default:
      return state
  }
};
