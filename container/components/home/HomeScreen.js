import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'

import { AuthContext } from '../routes/AuthProvider'
import colors from '../../assets/colors'
import LinearGradient from 'react-native-linear-gradient'

const HomeScreen = () => {
    const { user, logOut } = useContext(AuthContext)

    return (
        <LinearGradient colors={[`${colors.secondColor}`, `${colors.thirdColor}`]} style={styles.container}>

            <View >
                <Text>HomeScreen</Text>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
        // marginVertical: 8,
        // backgroundColor: colors.primaryColor,
        // paddingVertical: 18,
        // borderRadius: 10
    },
    text: {
        color: colors.whiteColor,
        alignSelf: 'center'
    }
});

export default HomeScreen