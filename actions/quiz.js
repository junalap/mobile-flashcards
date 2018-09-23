import { Notifications } from 'expo';
import { setLastQuizCompletedAt } from '../utils/API';
import { notificationTimeToday, setNotification } from '../utils/NotificationHelpers';

export const START_QUIZ = 'START_QUIZ';
export const QUESTION_ANSWERED = 'QUESTION_ANSWERED';
export const END_QUIZ = 'END_QUIZ';
export const SHOW_ANSWER = 'SHOW_ANSWER';

export const startQuiz = questions => ({ type: START_QUIZ, questions });
export const questionAnswered = answeredCorrectly => ({ type: QUESTION_ANSWERED, answeredCorrectly });
export const showAnswer = () => ({ type: SHOW_ANSWER });
export const quizComplete = () => {
  return () => {
    return setLastQuizCompletedAt()
             .then(Notifications.cancelAllScheduledNotificationsAsync)
             .then(() => {
               const notificationTime = notificationTimeToday();
               // set to same time tomorrow
               notificationTime.setDate(notificationTime.getDate() + 1)
               return setNotification(notificationTime)})
             .catch(error => console.warn(error));
  }
};
