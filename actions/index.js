import { fetchDecks, createDeck } from '../utils/API';

export const DECKS_RECEIVED = 'DECKS_RECEIVED';
const DECK_RECEIVED = 'DECK_RECEIVED';

export const decksReceived = (decks) => ({ type: DECKS_RECEIVED, decks });
export const deckReceived = (deck) => ({ type: DECK_RECEIVED, deck });

export const requestDecks = () => {
  return dispatch => {
    return fetchDecks()
      .then(decks => {
        dispatch(decksReceived(decks || {})) })
      .catch(error => {
        console.warn(error);})
  };
};
export const addDeck = (title) => {
  return dispatch => {
    createDeck(title)
      .then(deck => {
        dispatch(deckReceived(deck))}
      )
      .catch(error => {
        console.warn(error)
    })
  };
};
