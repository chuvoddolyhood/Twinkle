import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationScreen from '../../notification/NotificationScreen';
import ViewNotiScreen from '../../notification/ViewNotiScreen';

const NotificationStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Notification"
                component={NotificationScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ViewNoti"
                component={ViewNotiScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default NotificationStack