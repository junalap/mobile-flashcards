import React, { Component } from 'react';
import { ScrollView, Button } from 'react-native';
import DeckListItem from './DeckListItem';

const seedData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  Node: {
    title: 'Node',
    questions: [
      {
        question: 'What is a Node?',
        answer: 'A JS runtime'
      }
    ]
  },
  Python: {
    title: 'Python',
    questions: [
      {
        question: 'What is a Python?',
        answer: "A dynamically typed lanuage that's not Ruby"
      }
    ]
  },
  GraphQL: {
    title: 'GraphQL',
    questions: [
      {
        question: 'What is a GraphQL?',
        answer: 'A language for querying APIs and the runtime for it'
      }
    ]
  },
  Apollo: {
    title: 'Apollo',
    questions: [
      {
        question: 'What is a Apollo.js?',
        answer: 'A GraphQL client'
      }
    ]
  },
}

export default class DeckList extends Component {
  static navigationOptions = {
    title: "All Decks"
  }

  render() {
    // TODO: pass decks as prop instead
    const decks = seedData;

    return (
      <ScrollView>
        {Object.keys(decks).map((key, i) => (
          <DeckListItem key={i} deck={decks[key]} />
        ))}
      </ScrollView>
    )
  }
};
