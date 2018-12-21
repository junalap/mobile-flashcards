

# Mobile Flashcards
### Anuj Paliwal, anujpaliwal2.0@gmail.com

This project was created for Udacity's React Nanodegree Program. It was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## To Use

Install dependencies
```
yarn install
```

Start server
```
yarn start
```

## Notes

### State Shape and Persistence

I normalized the state as [per recommendations](https://redux.js.org/recipes/structuringreducers/normalizingstateshape). Questions have a 'foreign key' with the id of the deck they belong to and the object relations are determined client side. I had AsyncStorage keys for lists of deck ids and question ids in order to fetch all the questions and decks on app mount.

I stored the question and deck data themselves as serialized JSON objects. I created a formatting convention for persisting deck and question data in AsyncStorage: `deck:${deck.id}` and `question:${question.id}` In a production app I would look into a more robust solution for persisting the data. If I were creating a React Native App that uses an API from an MVC framework with a relational database I would likely use something like [Normalizr](https://github.com/paularmstrong/normalizr).

### Notification Implementation

I would likely handle notifications differently in a production app. I didn't have the time to look into the way the a React Native app is treated by the devices' OS and wasn't sure what to expect in different scenarios.

My solution for this project was
* Store lastQuizCompletedAt time in AsyncStorage
* When the app mounts
  * Cancel all notifications
  * Fetch lastQuizCompletedAt from local storage
  * Schedule a notification for either today or tomorrow depending on the time of day and/or lastQuizCompletedAt time
* When a quiz is completed
  * Cancel all notifications
  * Schedule a notification for tomorrow

### Notification Timing

Notifications are set to go off at 8PM every day unless a quiz has already been completed by that day. This can be adjusted in `notificationTimeToday` in `utils/NotificationsHelpers.js`.


### Tested With

This was tested using Expo in conjunction with:

* Android Studio 3.1.4 running Pixel API 22 Emulator
* IOS Simulator 10.0 running iPhone 5s - IOS 10.3

To verify the notification in the IOS simulator the Mobile Flashcards app should NOT be in the foreground. I didn't include a way to delete the record of a quiz being completed, which can make testing more cumbersome. One workaround is to clear the record of the last quiz complete via `AsyncStorage.removeItem('lastQuizCompletedAt)` and fiddle with the `notificationTime` to quickly test whatever scenarios you're interested in.
# mobile-flashcards
