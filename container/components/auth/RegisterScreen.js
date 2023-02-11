import { View, Text, KeyboardAvoidingView, Keyboard, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import LottieView from 'lottie-react-native';

import AuthenticateStyle from './Authenticate.style'
import assets from '../../assets/img';
import FontStyle from '../../assets/font';
import Input from './Input';
import Button from './Button';
import { faCircleUser, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { isValidEmailPhone, isValidName, isValidPassword, isValidRePassword } from '../../assets/Validation';
import { AuthContext } from '../routes/AuthProvider';

export default function RegisterScreen({ navigation }) {
    const [keyboardShowed, setKeyboardShowed] = useState(true)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [errorName, setErrorName] = useState('')
    const [errorUsername, setErrorUsername] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorRePassword, setErrorRePassword] = useState('')

    const { signUp } = useContext(AuthContext)

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardShowed(false)
        })
        Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardShowed(true)
        })
    })

    const onChangeText_Name = (text) => setName(text)
    const onChangeText_Username = (text) => setUsername(text)
    const onChangeText_Password = (text) => setPassword(text)
    const onChangeText_RePassword = (text) => setRePassword(text)

    const isValidationOK = () => isValidName(name) && isValidEmailPhone(username) && isValidPassword(password) && isValidRePassword(password, rePassword)

    const onPress = () => {
        setErrorName((!isValidName(name)) ? 'Name is not empty.' : '');
        setErrorUsername((!isValidEmailPhone(username)) ? 'Email or Phone number is not correct.' : '');
        setErrorPassword(!isValidPassword(password) ? 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.' : '');
        setErrorRePassword(!isValidRePassword(password, rePassword) ? "Password didn't match." : '');

        if (isValidationOK())
            signUp(username, password)
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={AuthenticateStyle.container}>
            {keyboardShowed && <View style={AuthenticateStyle.header}>
                <LottieView
                    source={assets.lottieFiles.img_9}
                    autoPlay
                    loop
                    style={{ width: '90%' }}
                />
            </View>}
            <View style={AuthenticateStyle.body}>
                <Text style={[FontStyle.h1, AuthenticateStyle.heading]}>Create an Account</Text>
                <View style={AuthenticateStyle.form}>
                    <Input
                        title="Name"
                        icon={faCircleUser}
                        isPassword={false}
                        onChangeText={onChangeText_Name}
                    />
                    <Text style={{ color: 'red', marginBottom: 5 }}>{errorName}</Text>
                    <Input
                        title="Email or phone number"
                        icon={faUser}
                        isPassword={false}
                        onChangeText={onChangeText_Username}
                    />
                    <Text style={{ color: 'red', marginBottom: 5 }}>{errorUsername}</Text>
                    <Input
                        title="Password"
                        icon={faKey}
                        isPassword={true}
                        onChangeText={onChangeText_Password}
                    />
                    <Text style={{ color: 'red', marginBottom: 5 }}>{errorPassword}</Text>
                    <Input
                        title="Re-password"
                        icon={faKey}
                        isPassword={true}
                        onChangeText={onChangeText_RePassword}
                    />
                    <Text style={{ color: 'red', marginBottom: 5 }}>{errorRePassword}</Text>
                    <Button onPress={onPress} />
                    <View style={AuthenticateStyle.belowButton}>
                        <Text>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.replace('Login')}>
                            <Text style={AuthenticateStyle.signupText} >Sign in here</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}