const START_QUIZ = 'START_QUIZ';
const POPULATE_QUIZ = 'POPULATE_QUIZ';
const QUESTION_ANSWERED = 'QUESTION_ANSWERED';
const SHOW_ANSWER = 'SHOW_ANSWER';
const INITIALIZE_QUIZ = 'INITIALIZE_QUIZ';

const initialState = {
  questions: {},
  correctCount: 0,
  currentQuestionIndex: 0,
  complete: false,
  answerVisible: false,
  deckId: null
};

export default function quiz(state = initialState, action) {
  switch(action.type) {
    case START_QUIZ:
      console.log('START_QUIZ')
      console.log(action)
      return {
        ...initialState,
        questions: action.questions,
        deckId: Object.values(action.questions)[0].deckId
      };
    case QUESTION_ANSWERED:
      const { answeredCorrectly } = action ;
      const correctCount = answeredCorrectly ? state.correctCount + 1: state.correctCount
      const nextIndex = state.currentQuestionIndex + 1;

      const complete = nextIndex > Object.keys(state.questions).length - 1;
      // console.log('complete: ', nextIndex > state.questions.length - 1)


      return {
        ...state,
        correctCount,
        currentQuestionIndex: complete ? 0 : state.currentQuestionIndex + 1,
        complete: complete,
        answerVisible: false,
        deckId: complete ? null : state.deckId
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
