import React, { useRef } from 'react';
import {
    Animated,
    Text,
    View,
    StyleSheet,
    Button,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import colors from '../../assets/colors';
import BottomSheet from './BottomSheet';

const NotificationScreen = () => {
    const ref = useRef(null)

    const onPress = () => {
        ref.current = -100
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {/* <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={onPress} />
                <BottomSheet ref={ref} />
            </View> */}
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111'
    },
    button: {
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.whiteColor,
        aspectRatio: 1,
        opacity: .6
    },

});


export default NotificationScreen