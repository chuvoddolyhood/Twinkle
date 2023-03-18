import { StyleSheet, Text, View, useWindowDimensions, TouchableWithoutFeedback, TouchableOpacity, Image, Modal, ActivityIndicator } from 'react-native'
import React, { forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useState } from 'react'
import colors from '../../assets/colors'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import Input from '../auth/Input'
import { faCrown, faQuoteLeft, faUser } from '@fortawesome/free-solid-svg-icons'
import LinearGradient from 'react-native-linear-gradient'
import assets from '../../assets/img'
import Button from '../auth/Button'
import { AuthContext } from '../routes/AuthProvider'
import firestore from '@react-native-firebase/firestore';
import { choosePhotoFromLibrary } from '../expanse'
import storage from '@react-native-firebase/storage';

const UpdateInforScreen = forwardRef(({ activeHeight, onHandle }, ref) => {
    const { user } = useContext(AuthContext)

    const [dataUser, setDataUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [nickname, setNickName] = useState('')
    const [bio, setBio] = useState('')
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const height = useWindowDimensions().height

    const topAnimation = useSharedValue(height)

    const animationStyle = useAnimatedStyle(() => {
        const top = topAnimation.value

        return { top }
    })

    const openUpdateScr = useCallback((data) => {
        console.log(data);
        setDataUser(data);
        setName(data.name);
        setNickName(data.nickname);
        setBio(data.bio);

        'worklet';
        topAnimation.value = withSpring(activeHeight, {
            damping: 40,
            stiffness: 300
        })
    })

    const closeUpdateScr = useCallback(() => {
        'worklet';
        topAnimation.value = withSpring(height, {
            damping: 40,
            stiffness: 300
        });
        onHandle();
    })

    useImperativeHandle(ref, () => ({
        openUpdateScr, closeUpdateScr
    }), [openUpdateScr, closeUpdateScr])

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

    const chooseImage = async () => {
        const imageUri = await choosePhotoFromLibrary();
        // console.log('Image URL: ', imgURL);
        setImage(imageUri);
    }

    // console.log('dataUser', dataUser.postImg);

    //Upload img to Storage
    const uploadImg = async () => {
        if (image === null) {
            return null
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        setUploading(true);
        setTransferred(0);

        const storageRef = storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadUri);

        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );

            setTransferred(Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100));
        });

        try {
            await task;
            const url = await storageRef.getDownloadURL();

            setUploading(false);
            setImage(null);


            return url;

        } catch (e) {
            console.log(e);
            return null;
        }
    }

    const submitPost = async () => {
        const imgURL = await uploadImg();

        await firestore()
            .collection('users')
            .doc(dataUser.userId)
            .update({
                bio: bio,
                imgURL: imgURL,
                name: name,
                nickname: nickname
            })
            .then(() => {
                console.log('Success');
                closeUpdateScr()
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={closeUpdateScr}>
                <Animated.View style={[styles.backDrop, backDropAnimation]} />
            </TouchableWithoutFeedback>

            <Animated.View style={[styles.container, animationStyle]}>
                <View style={styles.lineContainer}>
                    <View style={styles.line} />
                </View>
                <View style={styles.frameContainer}>
                    <Text>Edit profile</Text>

                    <TouchableOpacity onPress={chooseImage}>
                        <LinearGradient
                            colors={[`${colors.heartColor}`, `${colors.chooseBlue}`]}
                            style={{
                                padding: 2,
                                borderRadius: 29,
                                marginVertical: 15
                            }}
                        >
                            <View
                                style={{
                                    padding: 3,
                                    borderRadius: 27,
                                    backgroundColor: colors.secondColor
                                }}>
                                <Image
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 25,
                                        resizeMode: 'cover',
                                    }}
                                    source={image ? { uri: image } : (dataUser.imgURL ? { uri: dataUser.imgURL } : assets.photo.img_5)}
                                />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={{ marginVertical: 5 }} />
                    <Input
                        icon={faUser}
                        onChangeText={(text) => setName(text)}
                        value={name}
                        title={dataUser.name}
                    />
                    <View style={{ marginVertical: 5 }} />
                    <Input
                        icon={faCrown}
                        onChangeText={(text) => setNickName(text)}
                        value={nickname}
                        title={dataUser.nickname}
                    />
                    <View style={{ marginVertical: 5 }} />
                    <Input
                        value={bio}
                        title={dataUser.bio}
                        icon={faQuoteLeft}
                        onChangeText={(text) => setBio(text)}
                    />

                    <Button title='Update' onPress={submitPost} />

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={uploading}
                    >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: 200, height: 150, backgroundColor: colors.secondColor, borderRadius: 20, elevation: 8, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size='large' color={colors.primaryColor} animating />
                                <Text>{transferred}% Completed</Text>
                            </View>
                        </View>
                    </Modal>
                </View>
            </Animated.View>

        </>
    )
})

export default UpdateInforScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondColor,
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
        alignItems: 'center',
    },
})