import { Notifications, Permissions } from 'expo';
import { getLastCompletedAt } from '../utils/API';

export const notificationTimeToday = () => {
  const date = new Date();
  date.setHours(21, 0, 0, 0);
  return date;
}

const postCutoffTime = (time) => {
  return time > notificationTimeToday();
};

const inToday = (time) => {
  return new Date().toDateString() === time.toDateString();
}

const notification = {
  title: 'Mobile Flashcards',
  body: "Don't forget to complete your daily quiz!"
};

export const setLocalNotification = (notifyAt) => {
  return Permissions.askAsync(Permissions.NOTIFICATIONS)
  .then(() => {
    Notifications.cancelAllScheduledNotificationsAsync()
    Notifications.scheduleLocalNotificationAsync(
      notification,
      { time: notifyAt }
    )})
  .catch(error => console.warn(error));;
};

export const setNotification = () => {
  return Notifications
    .cancelAllScheduledNotificationsAsync()
    .then(getLastCompletedAt)
    .then(lastCompletedAt => {
      let notifyAt = notificationTimeToday();
      const rightNow = new Date();
      const lastCompletedAtDate = new Date(lastCompletedAt)

      if (postCutoffTime(rightNow) || inToday(lastCompletedAtDate)) {
        console.log('schedule tomorrow')
        notifyAt.setDate(notifyAt.getDate() + 1);
      } else if (!lastCompletedAt) {
        console.log('schedule today')
      }

      return setLocalNotification(notifyAt)
    }).catch(error => console.warn(error))
}








