import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import colors from '../../assets/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment, faHeart, faLocationDot, faShare } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../routes/AuthProvider';
import assets from '../../assets/img';

const Card = (props) => {
    const { id, caption, comments, likes, postImg, postTime, userId } = props.items

    const { openComment } = props

    const { user, logOut } = useContext(AuthContext)

    const [loadingImage, setLoadingImage] = useState(false)
    const [loading, setLoading] = useState(false)
    const [height, setHeight] = useState(0);
    const [options, setOptions] = useState(false)
    const [dataUser, setDataUser] = useState([])
    const [currentUserLike, setCurrentUserLike] = useState(0) //check current user liked
    const [amountLike, setAmountLike] = useState(0) //check amount of post's like
    const [statusLike, setStatusLike] = useState(undefined) //status of like
    const [idLike, setIdLike] = useState('') //id doc's like on firestore

    useEffect(() => {
        if (postImg) {
            Image.getSize(postImg, (width, height) => {
                setHeight(height);
                setLoadingImage(true)
            }, (errorMsg) => {
                console.log(errorMsg);
            });
        }
    }, [])

    const deletePhoto = async () => {
        try {
            await firestore().collection('posts').doc(id)
                .update({
                    status: 0,
                })
                .then(() => {
                    setLoadingImage(true)
                    props.reRender(true);
                    console.log('Updated!');
                });
            setOptions(false)
        } catch (error) {
            console.log(error);
        }
    }

    //permission to delete photos of myself posted
    const showModal = () => {
        if (userId === user.uid) {
            setOptions(true)
        }
    }

    const fetchUser = async () => {
        try {
            await firestore().collection('users').where('userId', '==', userId).get().then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    // console.log(documentSnapshot.data());
                    setDataUser(documentSnapshot.data())
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(id, currentUserLike, amountLike, statusLike);

    const fetchLike = async () => {
        try {
            //check user liked
            await firestore()
                .collection('posts')
                .doc(id)
                .collection('likes')
                .where('userId', '==', user.uid)
                .get()
                .then(querySnapshot => {
                    setCurrentUserLike(querySnapshot.size)
                    setStatusLike(querySnapshot.size === 1 ? true : false)
                    querySnapshot.forEach(documentSnapshot => {
                        setIdLike(documentSnapshot.id);
                    });
                });

            //Count amount of like per posts
            await firestore()
                .collection('posts')
                .doc(id)
                .collection('likes')
                .get()
                .then(querySnapshot => {
                    setAmountLike(querySnapshot.size)
                });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser()
        fetchLike()

    }, [])

    const addLike = async () => {
        try {
            await firestore()
                .collection('posts')
                .doc(id)
                .collection('likes')
                .add({
                    userId: user.uid,
                })
                .then(() => {
                    console.log('Liked!');
                });

            fetchLike()
        } catch (error) {
            console.log('Something went wrong with added user to firestore: ', error);
        }
    }

    const removeLike = async () => {
        try {
            await firestore()
                .collection('posts')
                .doc(id)
                .collection('likes')
                .doc(idLike)
                .delete()
                .then(() => {
                    console.log('Disliked!');
                });

            fetchLike()
        } catch (error) {
            console.log('Something went wrong with added user to firestore: ', error);
        }
    }

    const like = () => {
        if (currentUserLike === 1) {
            removeLike()
        } else {
            addLike()
        }
        setStatusLike(!statusLike)
    }

    const setIdPost = () => {
        // console.log(id);
        openComment(id)
    }

    return (
        <View style={styles.cardContainer}>
            <View style={styles.header}>
                <View style={styles.containerAvatarText}>
                    <Image
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 14,
                            resizeMode: 'cover',
                            marginRight: 10
                        }}
                        source={dataUser.imgURL ? { uri: dataUser.imgURL } : assets.photo.img_5}
                    />
                    <View style={styles.containerAllText}>
                        <Text style={styles.textName}>{dataUser.nickname ? dataUser.nickname : dataUser.name}</Text>
                        <View style={styles.containerNameLocation}>
                            <View style={styles.containerLocationTime}>
                                <FontAwesomeIcon icon={faLocationDot} size={12} color={colors.iconColor} />
                            </View>
                            <Text style={styles.textLocationTime}>{'HCMC'}   •   {moment(postTime.toDate()).fromNow()}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faShare} size={20} color={colors.iconColor} />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <Text style={styles.caption}>{caption}</Text>
                {loadingImage &&
                    <TouchableOpacity
                        onLongPress={showModal}
                    >
                        <Image
                            source={{ uri: postImg }}
                            resizeMode='cover'
                            style={{
                                width: '100%',
                                height: height / 6,
                                borderRadius: 15
                            }}
                        />
                    </TouchableOpacity>}
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={options}
                animated
                onRequestClose={() => {
                    Alert.alert('Close.');
                    setOptions(!options);
                }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 200, height: 150, backgroundColor: colors.secondColor, borderRadius: 20, elevation: 8, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Delete photo</Text>
                        <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-around', alignItems: 'center', width: '80%' }}>
                            <TouchableOpacity
                                style={[styles.containerImgFunc, { backgroundColor: colors.backgroundHeart, }]}
                                onPress={deletePhoto}
                            >
                                <Text>OK</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.containerImgFunc, { backgroundColor: colors.backgroundIcon, }]}
                                onPress={() => setOptions(false)}
                            >
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.footer}>
                <TouchableOpacity onPress={like}>
                    <View style={[styles.containerImgFunc, { backgroundColor: colors.backgroundHeart, }]}>
                        <FontAwesomeIcon icon={faHeart} size={20} color={statusLike ? colors.heartColor : colors.textColor} style={styles.iconFunc} />
                        <Text style={styles.textFunc}>{amountLike}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={setIdPost}>
                    <View style={[styles.containerImgFunc, { backgroundColor: colors.backgroundComment, }]}>
                        <FontAwesomeIcon icon={faComment} size={20} color={colors.commentColor} style={styles.iconFunc} />
                        <Text style={styles.textFunc}>150</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginVertical: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerAvatarText: {
        flexDirection: 'row',
    },
    containerAllText: {
        width: '80%'
    },
    containerLocationTime: {
        height: '100%',
        paddingTop: 2,
        marginRight: 5
    },
    textName: {
        color: colors.blackColor,
        fontSize: 16,
        fontWeight: '700'
    },
    containerNameLocation: {
        flexDirection: 'row',
        paddingRight: 3,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textLocationTime: {
        fontSize: 12,
        fontWeight: '500'
        // backgroundColor: 'red',
    },
    body: {
        // backgroundColor: 'yellow',
        marginVertical: 8
    },
    // containerImage: {
    //     padding: 5,
    //     backgroundColor: 'red',
    //     alignItems: 'center'
    // },
    caption: {
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 5
    },
    footer: {
        flexDirection: 'row',
        // backgroundColor: 'blue'
    },
    containerImgFunc: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginRight: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconFunc: {
        marginRight: 5
    },
    textFunc: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default Card