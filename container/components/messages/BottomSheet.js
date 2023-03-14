import { StyleSheet, Text, View, useWindowDimensions, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback, forwardRef, useImperativeHandle } from 'react'
import colors from '../../assets/colors'
import Animated, { interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { Gesture, GestureDetector, PanGestureHandler } from 'react-native-gesture-handler'


const BottomSheet = forwardRef(({ activeHeight }, ref) => {
    const height = useWindowDimensions().height;
    const topAnimation = useSharedValue(height)

    const animationStyle = useAnimatedStyle(() => {
        const top = topAnimation.value;
        return {
            top,
        }
    })

    const backDropAnimation = useAnimatedStyle(() => {
        const opacity = interpolate(
            topAnimation.value,
            [height, activeHeight],
            [0, 0.5]
        )

        const display = opacity === 0 ? 'none' : 'flex'

        return {
            opacity,
            display
        }
    })

    const expand = useCallback(() => {
        'worklet';
        topAnimation.value = withSpring(activeHeight, {
            damping: 40,
            stiffness: 300
        })
    }, [])

    const close = useCallback(() => {
        'worklet';
        topAnimation.value = withSpring(height, {
            damping: 40,
            stiffness: 300
        })
    }, [])

    useImperativeHandle(ref, () => ({
        expand, close
    }), [expand, close])

    const gesture = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            console.log(topAnimation.value);
            ctx.startY = topAnimation.value
        },
        onActive: (event, ctx) => {
            console.log(event.translationY);
            // if (event.translationY < 0) {
            //     topAnimation.value = withSpring(activeHeight, {
            //         damping: 40,
            //         stiffness: 300
            //     })
            // } else {
            topAnimation.value = withSpring(ctx.startY + event.translationY, {
                damping: 40,
                stiffness: 300
            })
            // }
        },
        onEnd: () => {
            console.log(topAnimation.value, activeHeight + 50, height / 3);
            //close
            if (topAnimation.value > activeHeight) {
                topAnimation.value = withSpring(height, {
                    damping: 40,
                    stiffness: 300
                })
            }
            //max expand
            else if (topAnimation.value < height / 4) {
                topAnimation.value = withSpring(0, {
                    damping: 40,
                    stiffness: 300
                })
            }
            //return middle screen
            else if (topAnimation.value > height / 4 && topAnimation.value < activeHeight) {
                topAnimation.value = withSpring(activeHeight, {
                    damping: 40,
                    stiffness: 300
                })
            }

        }
    })

    return (
        <>
            <TouchableWithoutFeedback onPress={close}>
                <Animated.View style={[styles.backDrop, backDropAnimation]} />
            </TouchableWithoutFeedback>
            <PanGestureHandler onGestureEvent={gesture}>
                <Animated.View style={[styles.container, animationStyle]}>
                    <View style={styles.lineContainer}>
                        <View style={styles.line} />
                    </View>
                </Animated.View>
            </PanGestureHandler>
        </>
    )
})



export default BottomSheet

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.whiteColor,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    lineContainer: {
        marginVertical: 10,
        alignItems: 'center'
    },
    line: {
        width: 50,
        height: 4,
        backgroundColor: colors.blackColor,
        borderRadius: 20
    },
    backDrop: {
        backgroundColor: colors.blackColor,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
})