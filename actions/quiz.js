import { setLastQuizCompletedAt } from '../utils/API';
import { AsyncStorage } from 'react-native';
import { notificationTime, setLocalNotification } from '../App';
import { Notifications, Permissions } from 'expo';


export const START_QUIZ = 'START_QUIZ';
export const QUESTION_ANSWERED = 'QUESTION_ANSWERED';
export const END_QUIZ = 'END_QUIZ';
export const SHOW_ANSWER = 'SHOW_ANSWER';

export const startQuiz = questions => ({ type: START_QUIZ, questions });
export const questionAnswered = answeredCorrectly => ({ type: QUESTION_ANSWERED, answeredCorrectly });

export const showAnswer = () => ({ type: SHOW_ANSWER });

// AsyncStorage.removeItem('lastQuizCompletedAt').then(() => console.log('last completed at cleared'))

export const quizComplete = () => {
  return dispatch => {
    setLastQuizCompletedAt().then(() => {
      Notifications.cancelAllScheduledNotificationsAsync().then(() => {
        let todaysNotificationTime = notificationTime();
        todaysNotificationTime.setDate(todaysNotificationTime.getDate() + 1)
        setLocalNotification(todaysNotificationTime).then(() => {
          console.log('notification set for tomorrow');
        })
      });



      return AsyncStorage.getItem('lastQuizCompletedAt').then((time) => {
        console.log(time);
      });
    });
  }
}
