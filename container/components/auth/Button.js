import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../assets/colors';
import FontStyle from '../../assets/font';

export default function Button({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <Text style={[FontStyle.textButton, styles.text]}>Next</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        backgroundColor: colors.primaryColor,
        paddingVertical: 18,
        borderRadius: 10
    },
    text: {
        color: colors.whiteColor,
        alignSelf: 'center'
    }
});