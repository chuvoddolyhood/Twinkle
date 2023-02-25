import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../routes/AuthProvider'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsis, faTableCells, faTableList } from '@fortawesome/free-solid-svg-icons'
import colors from '../../assets/colors'
import LinearGradient from 'react-native-linear-gradient'
import firestore from '@react-native-firebase/firestore';
import MasonryList from "react-native-masonry-list";

const ProfileScreen = () => {
    const { user, logOut } = useContext(AuthContext)

    const [dataPosting, setDataPosting] = useState([])
    const [dataImg, setDataImg] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchPosts = async () => {
        const list = [];
        const URL_IMG = [];
        try {
            await firestore().collection('posts').where('userId', '==', user.uid).orderBy('postTime', 'desc').get().then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    list.push({
                        id: documentSnapshot.id,
                        ...documentSnapshot.data()
                    })

                    URL_IMG.push({ uri: documentSnapshot.data().postImg })

                    setDataPosting(list)
                    setDataImg(URL_IMG)

                    if (loading) {
                        setLoading(false);
                    }
                });
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <LinearGradient colors={[`${colors.secondColor}`, `${colors.thirdColor}`]} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Profile</Text>
                <View style={styles.backgroundIcon}>
                    <FontAwesomeIcon icon={faEllipsis} size={20} color={colors.primaryColor} />
                </View>
            </View>
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
                <View style={styles.headingArea}>
                    <Text style={styles.headingPost}>My Posts</Text>
                    <View style={styles.containerIconList}>
                        <FontAwesomeIcon icon={faTableList} size={25} color={colors.primaryColor} style={{ marginLeft: 10 }} />
                        <FontAwesomeIcon icon={faTableCells} size={25} color={colors.primaryColor} style={{ marginLeft: 10 }} />
                    </View>
                </View>
                {loading ? <ActivityIndicator size='large' color={colors.primaryColor} animating /> :
                    <MasonryList
                        images={dataImg}
                    // Version *2.14.0 update
                    // onEndReached={() => {
                    //     // add more images when scrolls reaches end
                    // }}
                    />}
            </View>
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
        paddingVertical: 15,
        paddingHorizontal: 20,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.5,
        // shadowRadius: 2,
        elevation: 1, // changed to a greater value
        // zIndex: 99, // added zIndex
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
        flex: 4,
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
    body: {
        flex: 14,
        paddingHorizontal: 20,
        backgroundColor: colors.whiteColor,

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