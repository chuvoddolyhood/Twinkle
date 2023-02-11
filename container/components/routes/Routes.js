import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth'
import { AuthContext } from './AuthProvider'
import AppStack from './AppStack'
import OnboardingScreen from '../onboarding/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './AuthStack';

/**
 * 
 * @returns 
 * Directing threads to display the screen on application when it started
 */

const Routes = () => {
    //Saving information account
    const { user, setUser } = useContext(AuthContext)
    //Check first register account -> to show Onboarding Screen 
    const [initializing, setInitializing] = useState(null);

    const Stack = createNativeStackNavigator();

    useEffect(() => {
        AsyncStorage.getItem("firstLaunch").then(value => {
            // console.log("firstLaunch", value);
            if (value === null) {
                AsyncStorage.setItem("firstLaunch", 'true')
                setInitializing(true)
            } else {
                setInitializing(false)
            }
        })
    }, [])


    // Handle user state changes
    const onAuthStateChanged = (user) => {
        setUser(user);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // console.log("user", user, initializing);

    return (
        <View style={styles.container}>
            <NavigationContainer>
                <SafeAreaProvider>
                    {initializing &&
                        <Stack.Navigator>
                            <Stack.Screen
                                name="Onboarding"
                                component={OnboardingScreen}
                                options={{ headerShown: false }} />
                        </Stack.Navigator>
                    }
                    {user === null ? <AuthStack /> : <AppStack />}
                </SafeAreaProvider>
            </NavigationContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default Routes