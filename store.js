import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import decks from './reducers/decks';
import questions from './reducers/questions';
import quiz from './reducers/quiz';

const rootReducer = combineReducers({ decks, questions, quiz });

const store = createStore(rootReducer, applyMiddleware(thunk));
store.subscribe(() => console.log('store state tree change state:', store.getState()))

export default store;
