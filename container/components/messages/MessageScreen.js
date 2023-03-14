import { StyleSheet, Text, View, SafeAreaView, useWindowDimensions, Button } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import colors from '../../assets/colors'
import BottomSheet from './BottomSheet'

const MessageScreen = () => {
    const bottomSheet = useRef(null)
    const height = useWindowDimensions().height

    const open = useCallback(() => {
        bottomSheet.current.expand();
    }, [])

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <Button title='Open' onPress={open} />
                <BottomSheet activeHeight={height * 0.5} ref={bottomSheet} />
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default MessageScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.blackColor
    }
})