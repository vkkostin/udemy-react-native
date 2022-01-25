import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
  })
})

export default function App() {
  const [pushToken, setPushToken] = useState()

  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then(({ status }) => {
        if (status === 'granted') {
          return { status }
        }
        return Permissions.askAsync(Permissions.NOTIFICATIONS)
      })
      .then(({ status }) => {
        if (status !== 'granted') {
          throw new Error('Permission not granted!')
        }
      })
      .then(() => {
        return Notifications.getExpoPushTokenAsync()
      })
      .then(response => {
        setPushToken(response.data)
        // fetch('https://your-own-api.com') // to store the token
      })
      .catch(err => {
        return null
      })
  }, [])

  useEffect(() => {
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    const foregroundsubscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification)
    })

    return () => {
      foregroundsubscription.remove()
      backgroundSubscription.remove()
    }
  }, [])

  const triggerNotificationHandler = () => {
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: pushToken,
        data: {
          extraData: 'Data',
        },
        title: 'Sent via the app',
        body: 'This push notification was sent via the app',
      })
    })

    // Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: 'My first local notification',
    //     body: 'This is the first local notification we are sending!',
    //     data: {
    //       specialData: 'Data'
    //     }
    //   },
    //   trigger: {
    //     seconds: 5,
    //   },
    // })
  }

  return (
    <View style={styles.container}>
      <Button
        title="Trigger Notification"
        onPress={triggerNotificationHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
