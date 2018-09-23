import { Notifications, Permissions } from 'expo';
import { getLastCompletedAt } from '../utils/API';

export const notificationTimeToday = () => {
  const date = new Date();
  date.setHours(20, 0, 0, 0);
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
  .then(Notifications.cancelAllScheduledNotificationsAsync)
  .then(() => {
    return Notifications.scheduleLocalNotificationAsync(
      notification,
      { time: notifyAt }
    )
  })
  .catch(error => console.warn(error));;
};

export const setNotification = () => {
  return Notifications
    .cancelAllScheduledNotificationsAsync()
    .then(getLastCompletedAt)
    .then(lastCompletedAt => {
      const rightNow = new Date();
      const lastCompletedAtDate = new Date(lastCompletedAt)

      let notifyAt = notificationTimeToday();
      if (postCutoffTime(rightNow) || inToday(lastCompletedAtDate)) {
        notifyAt.setDate(notifyAt.getDate() + 1);
      }

      return setLocalNotification(notifyAt)
    }).catch(error => console.warn(error))
}
