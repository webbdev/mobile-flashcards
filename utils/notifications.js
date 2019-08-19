import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'MobiFlashCard:notifications';

export function clearNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

const localNotification = {
    title: 'Mobile Flashcards Reminder',
    body: 'You have not done a quiz for a day!',
    ios: {
        sound: true
    },
    android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
    }
};

export function setNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            Notifications.scheduleLocalNotificationAsync(
                                localNotification,
                                {
                                    time: Date.now() + 86400,
                                    repeat: 'day',
                                }
                            );
                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                        }
                    });
            }
        })
}
