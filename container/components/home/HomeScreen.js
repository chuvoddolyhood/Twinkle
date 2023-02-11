import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import Button from '../auth/Button'
import { AuthContext } from '../routes/AuthProvider'

const HomeScreen = () => {
    const { user, logOut } = useContext(AuthContext)

    return (
        <View>
            <Text>HomeScreen {user.email}</Text>
            <Button onPress={() => logOut()}>Log out</Button>
        </View>
    )
}

export default HomeScreen