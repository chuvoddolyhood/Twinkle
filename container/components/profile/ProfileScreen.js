import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useState, useEffect, useRef } from 'react'
import { AuthContext } from '../routes/AuthProvider'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsis, faTableCells, faTableList } from '@fortawesome/free-solid-svg-icons'
import colors from '../../assets/colors'
import LinearGradient from 'react-native-linear-gradient'
import firestore from '@react-native-firebase/firestore';
import theme from '../../assets/theme/theme'
import Gallery from './Gallery'
import PhotoPreview from './PhotoPreview'
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native'
import Animated from 'react-native-reanimated'
import Button from '../auth/Button'
import assets from '../../assets/img'


const ProfileScreen = () => {
    const { user } = useContext(AuthContext)

    const [dataUser, setDataUser] = useState([])
    const [dataPosting, setDataPosting] = useState([])
    const [loading, setLoading] = useState(true)
    const [photo, setPhoto] = useState('');
    const [visible, setVisible] = useState(false);

    const navigation = useNavigation();

    const fetchPosts = async () => {
        list = [];
        try {
            await firestore().collection('posts').where('userId', '==', user.uid).where('status', '==', 1).orderBy('postTime', 'desc').get().then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    list.push({
                        id: documentSnapshot.id,
                        ...documentSnapshot.data()
                    })
                });
            });
            setDataPosting(list)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchUser = async () => {
        try {
            await firestore().collection('users').where('userId', '==', user.uid).get().then(querySnapshot => {
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
        fetchPosts()
        fetchUser()

        if (dataPosting || dataUser) {
            setLoading(false)
        }
    }, [])

    //Show photo when long Pressing on photo
    const choosePhoto = (url) => {
        setPhoto(url)
        setVisible(true)
    }

    //Go back previous screen when Pressing out on photo
    const unChoosePhoto = () => {
        setPhoto(null)
        setVisible(false)
    }

    const isFocused = useIsFocused()
    useEffect(() => {
        fetchPosts()
        fetchUser()
    }, [isFocused])

    // //Animation
    // const fadeAnim = useRef(new Animated.Value(0)).current;

    // const fadeIn = () => {
    //     // Will change fadeAnim value to 1 in 5 seconds
    //     Animated.timing(fadeAnim, {
    //         toValue: 1,
    //         duration: 5000,
    //         useNativeDriver: true,
    //     }).start();
    // };

    // const fadeOut = () => {
    //     // Will change fadeAnim value to 0 in 3 seconds
    //     Animated.timing(fadeAnim, {
    //         toValue: 0,
    //         duration: 3000,
    //         useNativeDriver: true,
    //     }).start();
    // };


    return (
        <LinearGradient colors={[`${colors.secondColor}`, `${colors.thirdColor}`]} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Profile</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                    <View style={styles.backgroundIcon}>
                        <FontAwesomeIcon icon={faEllipsis} size={20} color={colors.primaryColor} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.scrollContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.info}>
                        <View style={styles.avatarArea}>
                            <View style={styles.nameArea}>
                                {dataUser.nickname ? <Text style={styles.nickname}>@{dataUser.nickname}</Text> : <Text style={styles.nickname}>@your-nickname</Text>}
                                <Text style={styles.name}>{dataUser.name}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setShow(true)}>
                                <LinearGradient
                                    colors={[`${colors.heartColor}`, `${colors.chooseBlue}`]}
                                    style={{
                                        padding: 2,
                                        borderRadius: 29,
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
                                            source={dataUser.imgURL ? { uri: dataUser.imgURL } : assets.photo.img_5}
                                        />
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.aboutMeArea}>
                            <Text style={styles.aboutMe}>About me</Text>
                            {dataUser.bio ? <Text style={styles.aboutMeContent}>{dataUser.bio}</Text> : <Text style={styles.aboutMeContent}>Your Bio</Text>}
                        </View>
                    </View>

                    <View style={styles.body}>
                        <View style={styles.PFFContainer}>
                            <View style={[styles.PFFBox, styles.PFFBox_choose]}>
                                <Text style={styles.numberPFFBox}>52</Text>
                                <Text style={styles.textPFFBox}>Post</Text>
                            </View>
                            <View style={styles.PFFBox}>
                                <Text style={styles.numberPFFBox}>250</Text>
                                <Text style={styles.textPFFBox}>Following</Text>
                            </View>
                            <View style={styles.PFFBox}>
                                <Text style={styles.numberPFFBox}>4.5k</Text>
                                <Text style={styles.textPFFBox}>Followers</Text>
                            </View>
                        </View>
                        <View style={styles.headingArea}>
                            <Text style={styles.headingPost}>My Posts</Text>
                            <View style={styles.containerIconList}>
                                <FontAwesomeIcon icon={faTableCells} size={22} color={colors.primaryColor} style={{ marginLeft: 10 }} />
                                <FontAwesomeIcon icon={faTableList} size={22} color={colors.iconColor} style={{ marginLeft: 15 }} />
                            </View>
                        </View>
                        {loading ? <ActivityIndicator size='large' color={colors.primaryColor} animating /> :
                            <View>
                                {dataPosting.length === 0 ?
                                    <View style={{ height: theme.dimension.windowHeight * 2 / 3 }}>
                                        <Text>No posts yet.</Text>
                                    </View>
                                    :
                                    <View style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap-reverse',
                                        justifyContent: 'space-between',
                                        marginVertical: 20,
                                        height: theme.dimension.windowHeight * 2 / 3
                                    }}>
                                        {dataPosting.map((value, index) => {
                                            return (
                                                <Gallery
                                                    key={index}
                                                    items={value}
                                                    onChoose={choosePhoto}
                                                    onUnChoose={unChoosePhoto}
                                                    onPress={() => { navigation.navigate('PostList') }}
                                                />
                                            )
                                        })}
                                    </View>
                                }
                            </View>
                        }
                    </View>
                </ScrollView>
            </View>

            {visible ? <PhotoPreview photo={photo} /> : null}

            {/* <Animated.View
                style={[
                    {
                        padding: 20,
                        backgroundColor: 'powderblue',
                    },
                    {
                        // Bind opacity to animated value
                        opacity: fadeAnim,
                    },
                ]}>
                <Text style={{
                    fontSize: 28,
                }}>Fading View!</Text>
            </Animated.View>
            <View style={{
                flexBasis: 100,
                justifyContent: 'space-evenly',
                marginVertical: 16,
            }}>
                <Button title="Fade In View" onPress={fadeIn} />
                <Button title="Fade Out View" onPress={fadeOut} />
            </View> */}

            {/* <Animated.View style={[{
                backgroundColor: colors.whiteColor,
                position: 'absolute',
                left: 0,
                height: theme.dimension.windowHeight / 2,
                width: '100%',
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                alignItems: 'center',
                zIndex: 100,
                elevation: 10,
                shadowColor: colors.blackColor,
                shadowOffset: {
                    height: -200,
                    width: 10
                },
                shadowOpacity: 0.54,
                shadowRadius: 40
            }, { bottom: bottom, }]}>
                <View>
                    <Text>Edit profile</Text>
                </View>
                <Button title="close" onPress={() => setShow(false)} />
            </Animated.View> */}


        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        backgroundColor: colors.secondColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.5,
        // shadowRadius: 2,
        elevation: 1, // changed to a greater value
        // zIndex: 99, // added zIndex
    },
    scrollContainer: {
        flex: 10,
    },
    heading: {
        color: colors.headingColor,
        fontSize: 32,
        fontWeight: '700'
    },
    backgroundIcon: {
        backgroundColor: colors.backgroundIcon,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    info: {
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    avatarArea: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nameArea: {
        justifyContent: 'center',
    },
    nickname: {
        color: colors.textColor,
        letterSpacing: -0.4,
        fontSize: 13,
        fontWeight: '500'
    },
    name: {
        color: colors.blackColor,
        fontSize: 28,
        fontWeight: 'bold'
    },
    aboutMe: {
        fontWeight: 'bold',
        color: colors.blackColor,
        fontSize: 18
    },
    aboutMeContent: {
        color: colors.textColor,
    },
    PFFContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.unChooseBlue,
        // height: 40,
        width: '100%',
        position: 'absolute',
        marginTop: -25,
        marginHorizontal: 20,
        borderRadius: 10
    },
    PFFBox: {
        alignItems: 'center',
        paddingVertical: 13,
        paddingHorizontal: 39,
        borderRadius: 10,
    },
    PFFBox_choose: {
        backgroundColor: colors.chooseBlue,
    },
    numberPFFBox: {
        color: colors.whiteColor,
        fontWeight: 'bold',
        fontSize: 20
    },
    textPFFBox: {
        color: colors.whiteColor
    },
    body: {
        paddingHorizontal: 20,
        paddingTop: 55,
        backgroundColor: colors.whiteColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: 30,
    },
    headingArea: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headingPost: {
        fontWeight: 'bold',
        color: colors.blackColor,
        fontSize: 18
    },
    containerIconList: {
        flexDirection: 'row'
    }

});

export default ProfileScreen