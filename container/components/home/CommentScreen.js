import { StyleSheet, Text, View, useWindowDimensions, TouchableWithoutFeedback, FlatList, ActivityIndicator } from 'react-native'
import React, { forwardRef, useCallback, useImperativeHandle, useEffect, useState, useContext } from 'react'
import colors from '../../assets/colors'
import Animated, { interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import CardComment from '../expanse/CardComment'
import { SearchInput } from '../expanse'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../routes/AuthProvider'

const CommentScreen = forwardRef(({ activeHeight }, ref) => {
    const { user } = useContext(AuthContext)

    const [idPost, setIdPost] = useState('')
    const [dataComment, setDataComment] = useState([])
    const [amountComment, setAmountComment] = useState(0) //check amount of post's like
    const [txtComment, setTxtComment] = useState('')

    const height = useWindowDimensions().height
    //initial value
    const topAnimation = useSharedValue(height)

    const animationStyle = useAnimatedStyle(() => {
        const top = topAnimation.value
        return { top }
    })

    const openComment = useCallback((index) => {
        setIdPost(index);

        'worklet';
        topAnimation.value = withSpring(activeHeight, {
            damping: 40,
            stiffness: 300
        })
    }, [])

    const closeComment = useCallback(() => {
        setIdPost('')
        setDataComment([])
        setAmountComment(0)

        'worklet';
        topAnimation.value = withSpring(height, {
            damping: 40,
            stiffness: 300
        })
    }, [])

    useImperativeHandle(ref, () => ({
        openComment, closeComment
    }), [openComment, closeComment])

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

    const gesture = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            // console.log(topAnimation.value);
            ctx.startY = topAnimation.value
        },
        onActive: (event, ctx) => {
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
            // console.log(topAnimation.value, activeHeight + 50, height / 3);
            //close
            if (topAnimation.value > activeHeight) {
                topAnimation.value = withSpring(height, {
                    damping: 40,
                    stiffness: 300
                })
            }
            //max expand
            else if (topAnimation.value < height / 6) {
                topAnimation.value = withSpring(0, {
                    damping: 40,
                    stiffness: 300
                })
            }
            //return middle screen
            else if (topAnimation.value > height / 6 && topAnimation.value < activeHeight) {
                topAnimation.value = withSpring(activeHeight, {
                    damping: 40,
                    stiffness: 300
                })
            }

        }
    })

    //Fetch comment's data
    const fetchComment = async () => {
        list = [];
        try {
            //check list user commented
            await firestore()
                .collection('posts')
                .doc(idPost)
                .collection('comments')
                .orderBy('createdAt', 'asc')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {
                        list.push({
                            id: documentSnapshot.id,
                            ...documentSnapshot.data()
                        })
                    });
                });
            setDataComment(list)


            //Count amount of comment per posts
            await firestore()
                .collection('posts')
                .doc(idPost)
                .collection('comments')
                .get()
                .then(querySnapshot => {
                    setAmountComment(querySnapshot.size)
                });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // fetchUser()
        fetchComment()

    }, [idPost])

    // console.log(dataComment);

    const addComment = (text) => {
        setTxtComment(text)
    }

    const pushComment = async () => {
        try {
            await firestore()
                .collection('posts')
                .doc(idPost)
                .collection('comments')
                .add({
                    userId: user.uid,
                    content: txtComment,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                })
                .then(() => {
                    console.log('commented!');
                });

            fetchComment()
            setTxtComment('')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={closeComment}>
                <Animated.View style={[styles.backDrop, backDropAnimation]} />
            </TouchableWithoutFeedback>
            <PanGestureHandler onGestureEvent={gesture}>
                <Animated.View style={[styles.container, animationStyle]}>
                    <View style={styles.lineContainer}>
                        <View style={styles.line} />
                    </View>
                    <View style={styles.frameContainer}>
                        <Text style={styles.amtCmt}>{amountComment > 1 ? amountComment + ` comments` : amountComment + ` comment`} </Text>
                        {dataComment.length !== 0 ?
                            <FlatList
                                data={dataComment}
                                renderItem={({ item }) =>
                                    <CardComment
                                        items={item}
                                        idPost={idPost}
                                        onHandle={fetchComment}
                                    />}
                                keyExtractor={item => item.id}
                                showsVerticalScrollIndicator={false}
                                style={{ width: '100%' }}
                            /> :
                            <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                <Text>No posts yet.</Text>
                            </View>}
                        <View style={styles.commentBox}>
                            <SearchInput
                                title={'comment here'}
                                icon={faPaperPlane}
                                onChangeText={addComment}
                                onPress={pushComment}
                                value={txtComment}
                            />
                        </View>
                    </View>
                </Animated.View>
            </PanGestureHandler>
        </>
    )
})

export default CommentScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.iconColor,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    lineContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    line: {
        width: 50,
        height: 4,
        backgroundColor: colors.primaryColor,
        borderRadius: 20
    },
    backDrop: {
        backgroundColor: colors.blackColor,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    frameContainer: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    amtCmt: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.blackColor
    },
    commentBox: {
        backgroundColor: 'red',
        width: '100%',
        position: 'absolute',
        bottom: 40,
        borderRadius: 10,
        zIndex: 1,
        elevation: 10,
        shadowColor: colors.blackColor,
        shadowOffset: {
            height: -200,
            width: 10
        },
        shadowOpacity: 0.84,
        shadowRadius: 10
    }
})