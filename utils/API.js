import { AsyncStorage } from 'react-native';

export const fetchDecks = () => AsyncStorage.getItem('allDecks');
export const fetchQuestions = () => AsyncStorage.getItem('allQuestions')
