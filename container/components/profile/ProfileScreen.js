import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../routes/AuthProvider'
import Button from '../auth/Button'

const ProfileScreen = () => {
    const { user, logOut } = useContext(AuthContext)
    return (
        <View>
            <Text>ProfileScreen {user.email}</Text>
            <Button onPress={() => logOut()} title="Log out" />
        </View>
    )
}

export default ProfileScreen