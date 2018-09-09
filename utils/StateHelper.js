


export const getQuestionsByDeckId = (deckId, state) => {
  return Object.values(state.questions).reduce((deckQuestions, question) => {
    if (question.deckId === deckId) {
      return { ...deckQuestions, [question.id]: question }
    }

    return deckQuestions;
  }, {});
};
