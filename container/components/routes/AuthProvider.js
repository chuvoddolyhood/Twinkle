import React, { createContext, useState } from 'react'
import auth from '@react-native-firebase/auth'
import Routes from './Routes';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import { Base64 } from 'js-base64';

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
                signUp: async (name, email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password).then(() => {
                            firestore().collection('users').doc(auth().currentUser.uid).set({
                                userId: auth().currentUser.uid,
                                name: name,
                                nickname: null,
                                imgURL: null,
                                bio: null,
                                username: email,
                                password: Base64.encode(password),
                                createdAt: firestore.Timestamp.fromDate(new Date()),
                                providers: auth().currentUser.providerData[0].providerId
                            }).catch(error => {
                                console.log('Something went wrong with added user to firestore: ', error);
                            })

                            console.log('User signed up!')
                        }
                        );
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
                },
                googleLogin: async () => {
                    try {
                        const { idToken } = await GoogleSignin.signIn();
                        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                        await auth().signInWithCredential(googleCredential).then(() => {
                            firestore().collection('users').doc(auth().currentUser.uid).set({
                                userId: auth().currentUser.uid,
                                name: auth().currentUser.displayName,
                                nickname: null,
                                imgURL: auth().currentUser.photoURL,
                                bio: null,
                                username: auth().currentUser.email,
                                password: null,
                                createdAt: firestore.Timestamp.fromDate(new Date()),
                                providers: auth().currentUser.providerData[0].providerId
                            }).catch(error => {
                                console.log('Something went wrong with added user to firestore: ', error);
                            })

                            console.log('User signed up!')
                        });
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