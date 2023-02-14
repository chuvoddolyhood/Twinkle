import { View, Text, KeyboardAvoidingView, Keyboard, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import LottieView from 'lottie-react-native';
import AuthenticateStyle from './Authenticate.style'
import assets from '../../assets/img';
import FontStyle from '../../assets/font';
import Input from './Input';
import Button from './Button';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { isValidEmailPhone, isValidPassword } from '../../assets/Validation';
import { AuthContext } from '../routes/AuthProvider';

export default function LoginScreen({ navigation }) {
    const [keyboardShowed, setKeyboardShowed] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorUsername, setErrorUsername] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const { signIn, googleLogin } = useContext(AuthContext);

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardShowed(false)
        })
        Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardShowed(true)
        })
    })

    const onPress = () => {
        setErrorUsername((!isValidEmailPhone(username)) ? 'Email or Phone number is not correct.' : '');
        setErrorPassword(!isValidPassword(password) ? 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.' : '');
        if (isValidationOK())
            signIn(username, password)
    }

    const onChangeText_Username = (text) => setUsername(text)

    const onChangeText_Password = (text) => setPassword(text)

    const isValidationOK = () => isValidEmailPhone(username) && isValidPassword(password)

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={AuthenticateStyle.container}>
            {keyboardShowed && <View style={AuthenticateStyle.header}>
                <LottieView
                    source={assets.lottieFiles.img_8}
                    autoPlay
                    loop
                    style={{ width: '110%' }}
                />
            </View>}
            <View style={AuthenticateStyle.body}>
                <Text style={[FontStyle.h1, AuthenticateStyle.heading]}>Sign in</Text>
                <View style={AuthenticateStyle.form}>
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
                    <Button onPress={onPress} title="Next" />
                    <View style={AuthenticateStyle.belowButton}>
                        <Text>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.replace('Register')}>
                            <Text style={AuthenticateStyle.signupText} >Sign up here</Text>
                        </TouchableOpacity>
                    </View>
                    <Button title="Sign in with Facebook" />
                    <Button onPress={googleLogin} title="Sign in with Google" />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}