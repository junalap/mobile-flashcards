import { fetchDecks, fetchQuestions, createDeck, createQuestion } from '../utils/API';
import NavigationService from '../utils/NavigationService';

export const DECKS_RECEIVED = 'DECKS_RECEIVED';
export const DECK_RECEIVED = 'DECK_RECEIVED';
export const QUESTION_RECEIVED = 'QUESTION_RECEIVED';
export const QUESTIONS_RECEIVED = 'QUESTIONS_RECEIVED';

export const decksReceived = (decks) => ({ type: DECKS_RECEIVED, decks });
export const deckReceived = (deck) => ({ type: DECK_RECEIVED, deck });
export const questionReceived = (question) => ({ type: QUESTION_RECEIVED, question });
export const questionsReceived = (questions) => ({ type: QUESTIONS_RECEIVED, questions });

export const requestDecks = () => {
  return dispatch => {
    return fetchDecks()
      .then(decks => dispatch(decksReceived(decks || {})))
      .catch(error => console.warn(error))
  };
};

export const requestQuestions = () => {
  return dispatch => {
    return fetchQuestions()
      .then(questions => dispatch(questionsReceived(questions)))
      .catch(error => console.warn(error));
  };
};

export const addDeck = (title) => {
  return dispatch => {
    createDeck(title)
      .then(deck => {
        dispatch(deckReceived(deck));
        NavigationService.navigate('Deck', { deckId: deck.id });
      })
      .catch(error => console.warn(error));
  };
};

export const addQuestion = (question) => {
  return dispatch => {
    createQuestion(question)
      .then(question => {
        dispatch(questionReceived(question));
        NavigationService.navigate('Deck', { deckId: question.deckId })
      })
      .catch(error => console.warn(error));
  }
}
