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

    const { user, logOut } = useContext(AuthContext)

    const [loading, setLoading] = useState(false)
    const [height, setHeight] = useState(0);
    const [options, setOptions] = useState(false)
    const [dataUser, setDataUser] = useState([])

    useEffect(() => {
        if (postImg) {
            Image.getSize(postImg, (width, height) => {
                setHeight(height);
                setLoading(true)
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
                    setLoading(true)
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

    useEffect(() => {
        fetchUser()
        // setLoading(false)
    }, [])

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
                {loading &&
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
                <View style={[styles.containerImgFunc, { backgroundColor: colors.backgroundHeart, }]}>
                    <FontAwesomeIcon icon={faHeart} size={20} color={true ? colors.heartColor : colors.textColor} style={styles.iconFunc} />
                    <Text style={styles.textFunc}>211</Text>
                </View>
                <View style={[styles.containerImgFunc, { backgroundColor: colors.backgroundComment, }]}>
                    <FontAwesomeIcon icon={faComment} size={20} color={colors.commentColor} style={styles.iconFunc} />
                    <Text style={styles.textFunc}>150</Text>
                </View>
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