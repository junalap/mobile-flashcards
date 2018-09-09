const START_QUIZ = 'START_QUIZ';
const QUESTION_ANSWERED = 'QUESTION_ANSWERED';
const SHOW_ANSWER = 'SHOW_ANSWER';

const initialState = {
  questions: [],
  correctCount: 0,
  currentQuestionIndex: 0,
  complete: false,
  answerVisible: false
};

export default function quiz(state = initialState, action) {
  switch(action.type) {
    case START_QUIZ:
      return {
        ...state,
        questions: action.questions,
        answerVisible: false
      };
    case QUESTION_ANSWERED:
      const answeredCorrectly = { action };
      const correctCount = answeredCorrectly ? state.correctCount + 1: state.correctCount
      const nextIndex = state.currentQuestionIndex + 1;

      return {
        ...state,
        correctCount,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        complete: nextIndex > state.questions.length - 1,
        answerVisible: false
      };
    case SHOW_ANSWER:
      return {
        ...state,
        answerVisible: true
      }
    default:
      return state;
  };
};
