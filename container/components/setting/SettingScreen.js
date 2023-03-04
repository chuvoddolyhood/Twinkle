import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Button from '../auth/Button'
import { AuthContext } from '../routes/AuthProvider'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../../assets/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native';

const SettingScreen = () => {
    const { user, logOut } = useContext(AuthContext)

    const navigation = useNavigation();

    return (
        <LinearGradient colors={[`${colors.secondColor}`, `${colors.thirdColor}`]} style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <View style={styles.backgroundIcon} >
                        <FontAwesomeIcon icon={faArrowCircleLeft} size={20} color={colors.primaryColor} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.heading}>Settings</Text>
            </View>
            <View style={styles.body}>
                <Text>SettingScreen</Text>
                <Button title='Log out' onPress={logOut} />
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        height: 60,
        width: '100%',
        backgroundColor: colors.secondColor,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.5,
        // shadowRadius: 2,
        elevation: 1, // changed to a greater value
        zIndex: 99, // added zIndex
    },
    heading: {
        color: colors.headingColor,
        fontSize: 32,
        fontWeight: '700'
    },
    backgroundIcon: {
        backgroundColor: colors.backgroundIcon,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15
    },
    body: {
        flex: 10,
        paddingHorizontal: 20,
        marginTop: 60
    },
})

export default SettingScreen