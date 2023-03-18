import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../assets/colors';
import FontStyle from '../../assets/font';

export default function Button(props) {
    const { onPress, title } = props

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <Text style={[FontStyle.textButton, styles.text]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        backgroundColor: colors.primaryColor,
        paddingVertical: 18,
        borderRadius: 10,
        width: '96%' // Neu co loi thi xoa dong nay
    },
    text: {
        color: colors.whiteColor,
        alignSelf: 'center'
    }
});