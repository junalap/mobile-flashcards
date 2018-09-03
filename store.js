import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/index';

const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => console.log('store state tree change state:', store.getState()))

export default store;
