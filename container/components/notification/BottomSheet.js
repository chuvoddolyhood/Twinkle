import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import colors from '../../assets/colors'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50

const BottomSheet = ({ ref }) => {
    const translateY = useSharedValue(0)

    const context = useSharedValue({ y: 0 })

    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value }
        })
        .onUpdate((event) => {
            // console.log(event.translationY);
            translateY.value = event.translationY + context.value.y;
            translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
        })
        .onEnd(() => {
            if (translateY.value > -SCREEN_HEIGHT / 3) {
                translateY.value = withSpring(0, { damping: 40 })
            } else if (translateY.value > -SCREEN_HEIGHT / 2) {
                translateY.value = withSpring(MAX_TRANSLATE_Y, { damping: 40 })
            } else if (translateY.value < -SCREEN_HEIGHT / 2) {
                translateY.value = withSpring(-SCREEN_HEIGHT / 3, { damping: 40 })
            }
        });

    const rBottomSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        }
    })

    useEffect(() => {
        translateY.value = withSpring(-SCREEN_HEIGHT / 3, { damping: 40 })
    }, [])

    return (
        <GestureDetector gesture={gesture}>
            {/* <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
                <View style={styles.line} />
                <Text>BottomSheet</Text>
            </Animated.View> */}
        </GestureDetector>
    )
}

export default BottomSheet

const styles = StyleSheet.create({
    bottomSheetContainer: {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: colors.whiteColor,
        position: 'absolute',
        top: SCREEN_HEIGHT,
        borderRadius: 25
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2
    }

})