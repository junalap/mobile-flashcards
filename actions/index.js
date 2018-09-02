import { fetchDecks } from '../utils/API';

const REQUEST_DECKS = 'REQUEST_DECKS';
const DECKS_RECEIVED = 'DECKS_RECEIVED';

export const requestDecks = () => {
  return dispatch => {
    return fetchDecks().then(decks => dispatch(decksReceived(decks)))
  };
};

export const decksReceived = (decks) => ({ type: DECKS_RECEIVED, decks })

