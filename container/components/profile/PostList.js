import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState, useContext, useRef } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../../assets/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../routes/AuthProvider'
import Card from '../home/Card'
import { useNavigation } from '@react-navigation/native';
import Animated, { Easing } from 'react-native-reanimated'
import theme from '../../assets/theme/theme'

const PostList = () => {
    const { user, logOut } = useContext(AuthContext)
    const [dataPosting, setDataPosting] = useState([])
    const [loading, setLoading] = useState(true)

    const navigation = useNavigation();

    const animatedValue = useRef(new Animated.Value(0)).current;

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

    //Animation
    const headerBarAnimation_up = {
        transform: [
            {
                translateY: animatedValue.interpolate({
                    inputRange: [0, theme.dimension.windowHeight / 2, theme.dimension.windowHeight],
                    outputRange: [0, -theme.dimension.windowHeight / 200, -theme.dimension.windowHeight / 10],
                    extrapolate: 'clamp'
                })
            },
        ],
    }

    const reRender = (status) => {
        if (status) {
            fetchPosts()
        }
        console.log(status);
    }

    return (
        <LinearGradient colors={[`${colors.secondColor}`, `${colors.thirdColor}`]} style={styles.container}>
            <Animated.View style={[styles.header, headerBarAnimation_up]}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <View style={styles.backgroundIcon} >
                        <FontAwesomeIcon icon={faArrowCircleLeft} size={20} color={colors.primaryColor} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.heading}>Posts</Text>
            </Animated.View>
            <View style={styles.body}>
                {loading ? <ActivityIndicator size='large' color={colors.primaryColor} animating /> :
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        onScroll={e => {
                            const offsetY = e.nativeEvent.contentOffset.y;
                            animatedValue.setValue(offsetY)
                        }}
                        scrollEventThrottle={16}
                    >
                        {dataPosting.map((value, index) => (
                            <View key={index}>
                                <View style={{ marginTop: 60 }} />
                                <Card items={value} reRender={reRender} />
                            </View>
                        ))}
                    </ScrollView>
                }
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        height: 60,
        width: '100%',
        // flex: 1,
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
        zIndex: 99, // added zIndex
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
    body: {
        flex: 10,
        paddingHorizontal: 20,
    },
})

export default PostList