import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
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


const ProfileScreen = () => {
    const { user, logOut } = useContext(AuthContext)

    const [dataPosting, setDataPosting] = useState([])
    const [loading, setLoading] = useState(true)
    const [photo, setPhoto] = useState('');
    const [visible, setVisible] = useState(false);

    const navigation = useNavigation();

    const fetchPosts = async () => {
        list = [];
        try {
            await firestore().collection('posts').where('userId', '==', user.uid).orderBy('postTime', 'desc').get().then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    list.push({
                        id: documentSnapshot.id,
                        ...documentSnapshot.data()
                    })
                });
            });
            setDataPosting(list)
            if (dataPosting) {
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPosts()
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

    // console.log('dataPosting', dataPosting);

    return (
        <LinearGradient colors={[`${colors.secondColor}`, `${colors.thirdColor}`]} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Profile</Text>
                <View style={styles.backgroundIcon}>
                    <FontAwesomeIcon icon={faEllipsis} size={20} color={colors.primaryColor} />
                </View>
            </View>
            <View style={styles.scrollContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.info}>
                        <View style={styles.avatarArea}>
                            <View style={styles.nameArea}>
                                <Text style={styles.nickname}>@chuvod.dolyhood</Text>
                                <Text style={styles.name}>Chloé de Janvier</Text>
                            </View>
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
                                        source={require('./../../assets/img/anhthe.png')}
                                    />
                                </View>
                            </LinearGradient>

                        </View>
                        <View style={styles.aboutMeArea}>
                            <Text style={styles.aboutMe}>About me</Text>
                            <Text style={styles.aboutMeContent}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mauris est, porttitor id condimentum a, suscipit in nunc</Text>
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
                                        <Text>Chưa có bài viết nào</Text>
                                    </View>
                                    :
                                    <View style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap-reverse',
                                        justifyContent: 'space-between',
                                        marginVertical: 20
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