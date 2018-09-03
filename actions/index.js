import { fetchDecks, createDeck } from '../utils/API';
import NavigationService from '../utils/NavigationService';

export const DECKS_RECEIVED = 'DECKS_RECEIVED';
export const DECK_RECEIVED = 'DECK_RECEIVED';

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
        dispatch(deckReceived(deck))
        // TODO: Navigate to Deck Show page
        NavigationService.navigate('Home')
      })
      .catch(error => {
        console.warn(error)
    })
  };
};
