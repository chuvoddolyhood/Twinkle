import { StyleSheet, FlatList, ActivityIndicator, View, Text, useWindowDimensions } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { AuthContext } from '../routes/AuthProvider'
import colors from '../../assets/colors'
import LinearGradient from 'react-native-linear-gradient'
import Card from './Card'
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native'
import theme from '../../assets/theme/theme'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CommentScreen from './CommentScreen';

const HomeScreen = () => {
    const { user, logOut } = useContext(AuthContext)

    const [dataPosting, setDataPosting] = useState([])
    const [dataUser, setDataUser] = useState([])
    const [loading, setLoading] = useState(true)

    //BottomSheet
    const height = useWindowDimensions().height
    const bottomSheet = useRef(null)

    const fetchPosts = async () => {
        const list = [];
        try {
            await firestore()
                .collection('posts')
                .where('status', '==', 1)
                .orderBy('postTime', 'desc')
                .get()
                .then(querySnapshot => {
                    // console.log('Total users: ', querySnapshot.size);

                    querySnapshot.forEach(documentSnapshot => {
                        // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                        // const { caption, comments, likes, postImg, postTime, userId } = documentSnapshot.data()

                        list.push({
                            id: documentSnapshot.id,
                            ...documentSnapshot.data()
                        })
                    });
                })
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

    //Nhan biet sau khi navigate ve home screen thi se re-render app
    const isFocused = useIsFocused()
    useEffect(() => {
        fetchPosts()
    }, [isFocused])

    // console.log('dataUser', dataUser);

    const open = useCallback(() => {
        bottomSheet.current.openComment();
    }, [])

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <LinearGradient colors={[`${colors.secondColor}`, `${colors.thirdColor}`]} style={styles.container}>

                {loading ? <ActivityIndicator size='large' color={colors.primaryColor} animating /> :
                    <>
                        {dataPosting.length !== 0 ?
                            <FlatList
                                data={dataPosting}
                                renderItem={({ item }) => <Card items={item} user={dataUser} openComment={open} />}
                                keyExtractor={item => item.id}
                                showsVerticalScrollIndicator={false}
                            /> :
                            <View style={{ alignItems: 'center', justifyContent: 'center', height: theme.dimension.windowHeight / 1.5 }}>
                                <Text>No posts yet.</Text>
                            </View>}
                    </>
                }

            </LinearGradient>
            <CommentScreen activeHeight={height * 0.3} ref={bottomSheet} />
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    text: {
        color: colors.whiteColor,
        alignSelf: 'center'
    }
});

export default HomeScreen