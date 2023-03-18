import { View, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import colors from '../../assets/colors'

export default function Input({ title, icon, isPassword, onChangeText, value }) {
    return (
        <View style={InputStyle.container}>
            <View style={InputStyle.containerIcon}>
                <FontAwesomeIcon icon={icon} size={20} color={colors.whiteColor} />
            </View>
            <TextInput
                placeholder={title}
                style={InputStyle.textInput}
                secureTextEntry={isPassword}
                onChangeText={text => onChangeText(text)}
                value={value}
            />
        </View>
    )
}

const InputStyle = StyleSheet.create({
    container: {
        padding: 6,
        borderColor: 'grey',
        borderWidth: 0.3,
        borderRadius: 8,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerIcon: {
        backgroundColor: colors.iconColor,
        padding: 12,
        borderRadius: 8,
        marginRight: 15
    },
    textInput: {
        // backgroundColor: 'red',
        padding: 5,
        width: '80%'
    }
})