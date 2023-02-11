import React from 'react'
import HomeScreen from '../home/HomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/**
 * 
 * @returns 
 * Organize the screen navigation for main screens
 */

const AppStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default AppStack