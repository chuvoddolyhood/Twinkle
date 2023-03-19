import { StyleSheet, FlatList, ActivityIndicator, View, Text, useWindowDimensions } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'

import colors from '../../assets/colors'
import LinearGradient from 'react-native-linear-gradient'
import Card from './Card'
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native'
import theme from '../../assets/theme/theme'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CommentScreen from './CommentScreen';

const HomeScreen = () => {
    const [dataPosting, setDataPosting] = useState([])
    const [loading, setLoading] = useState(true)

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

    useEffect(() => {
        fetchPosts()

        if (dataPosting) {
            setLoading(false)
        }
    }, [])

    //Nhan biet sau khi navigate ve home screen thi se re-render app
    const isFocused = useIsFocused()
    useEffect(() => {
        fetchPosts()
    }, [isFocused])

    //BottomSheet
    const height = useWindowDimensions().height
    const bottomSheet = useRef(null)
    const open = useCallback((index) => {
        //index la id cua idPost vi open la function dang duoc render theo tung item trong Flatlist
        bottomSheet.current.openComment(index);
    }, [])

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <LinearGradient colors={[`${colors.secondColor}`, `${colors.thirdColor}`]} style={styles.container}>
                {loading ? <ActivityIndicator size='large' color={colors.primaryColor} animating /> :
                    <>
                        {dataPosting.length !== 0 ?
                            <FlatList
                                data={dataPosting}
                                renderItem={({ item }) => <Card items={item} openComment={open} onHandle={fetchPosts} />}
                                keyExtractor={item => item.id}
                                showsVerticalScrollIndicator={false}
                            /> :
                            <View style={{ alignItems: 'center', justifyContent: 'center', height: theme.dimension.windowHeight / 1.5 }}>
                                <Text>No posts yet.</Text>
                            </View>}
                    </>
                }

            </LinearGradient>
            <CommentScreen
                activeHeight={height * 0.3}
                ref={bottomSheet}
            />
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