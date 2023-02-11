import React, { createContext, useState } from 'react'
import auth from '@react-native-firebase/auth'
import Routes from './Routes';
import LoginScreen from '../auth/LoginScreen';

//create context so that sharing state in which component that you want to share it
export const AuthContext = createContext();

/**
 * 
 * @returns 
 * This file is used to save user information and share throughout the component
 * Also perform authentication tasks on firebase
 */


const AuthProvider = () => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user: user,
                setUser: setUser,
                signIn: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password).then(() => console.log('User signed in!'));
                    } catch (error) {
                        console.log(error);
                    }
                },
                signUp: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password).then(() => console.log('User signed up!'));
                    } catch (error) {
                        if (error.code === 'auth/email-already-in-use') {
                            console.log('That email address is already in use!');
                        }

                        if (error.code === 'auth/invalid-email') {
                            console.log('That email address is invalid!');
                        }

                        console.error(error);
                    }
                },
                logOut: async () => {
                    try {
                        await auth().signOut().then(() => console.log('User signed out!'));;
                    } catch (error) {
                        console.log(error);
                    }
                }
            }}
        >
            <Routes />
        </AuthContext.Provider>
    )
}

export default AuthProvider