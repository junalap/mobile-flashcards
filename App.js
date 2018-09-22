import React from 'react';
import { AsyncStorage } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import NavigationService from './utils/NavigationService';
import store from './store';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import Deck from  './components/Deck';
import Quiz from './components/Quiz';
import AddQuestion from './components/AddQuestion';
import  { getLastCompletedAt } from './utils/API';
import { Notifications, Permissions } from 'expo';


const mockNotification = {
  title: 'Fake Title',
  body: 'Fake body.',
  data: {
    fakeKey: 'Fake value'
  }
};

const mockOptions = {
  time: new Date().getTime() + 10000,
  repeat: 'minute'
}

const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

const notificationTime = () => {
  const date = new Date();
  // date.setHours(12, 0, 0, 0);
  date.setHours(9, 15, 0, 0);
  return date
}

const postCutoffTime = (time) => {
  return time > notificationTime();
}

const inToday = (time) => {
  return new Date().toDateString() === time.toDateString();
}



const onAppLoad = () => {
  Notifications.cancelAllScheduledNotificationsAsync().then(() => {
    AsyncStorage.removeItem('lastQuizCompletedAt').then(() => console.log('should be gone'))
    console.log('App loading: cancelling all previously scheduled notifications');
    let notifyAt = notificationTime();

    const rightNow = new Date();

    return getLastCompletedAt().then(lastCompletedAt => {
      console.log(lastCompletedAt);
      console.log(postCutoffTime(rightNow), inToday(new Date(lastCompletedAt)));

      if (postCutoffTime(rightNow) || inToday(new Date(lastCompletedAt))) {
        console.log('schedule tomorrow')
        notifyAt.setDate(notifyAt.getDate() + 1);
        setLocalNotification(notifyAt).then(() => console.log("Notification set"))
      } else if (!lastCompletedAt) {
        console.log('schedule today')
        setLocalNotification(notifyAt).then(() => console.log("Notification set"))
      } else {
        console.log('what up')
      }

    });
  }).catch(error => console.log(error))
}

function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function setLocalNotification (notifyAt) {
  return AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      Notifications.scheduleLocalNotificationAsync(
        mockNotification,
        { time: notifyAt }
      ).then(() => console.log('notification scheduled'));


      //3333



      if (data === null) {
        console.log(Permissions.Notifications)
        // debugger
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            console.log(status, 'nigga')

            if (status === 'undetermined') {
              Notifications.cancelAllScheduledNotificationsAsync()
              Notifications.scheduleLocalNotificationAsync(
                mockNotification,
                { time: notifyAt }
              ).then(() => console.log('notification scheduled'));
              return AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

AsyncStorage.getAllKeys().then(keys => console.log(keys));

// title

// body

// data

// second argument:

// schedulingOptions: {time, repeoat}



import { requestDecks, requestQuestions } from './actions/index';

const RootStack = createStackNavigator(
  {
    Home: DeckList,
    AddDeck,
    Deck,
    Quiz,
    AddQuestion
  },
  {
    initialRoute: 'Home'//,
    // navigationOptions: {
    //   headerStyle: {
    //     backgroundColor: '#f4511e'
    //   },
    //   headerTintColor: '#fff',
    // }
  }
);

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(requestDecks());
    this.props.dispatch(requestQuestions());

    onAppLoad();

  }

  render() {
    return (
      <RootStack
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    decks: state.decks,
    questions: state.questions
  }
}

const ConnectedApp = connect(mapStateToProps)(App);

export default function AppContainer() {
  return <Provider store={store}><ConnectedApp /></Provider>
}
