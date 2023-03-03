import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../../profile/ProfileScreen';
import PostList from '../../profile/PostList';

const ProfileStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PostList"
                component={PostList}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default ProfileStack