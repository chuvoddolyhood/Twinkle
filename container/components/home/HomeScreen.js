import { StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from '../routes/AuthProvider'
import colors from '../../assets/colors'
import LinearGradient from 'react-native-linear-gradient'
import Card from './Card'
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native'

const HomeScreen = () => {
    const { user, logOut } = useContext(AuthContext)

    const [dataPosting, setDataPosting] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchPosts = async () => {
        const list = [];
        try {
            await firestore().collection('posts').where('status', '==', 1).orderBy('postTime', 'desc').get().then(querySnapshot => {
                // console.log('Total users: ', querySnapshot.size);

                querySnapshot.forEach(documentSnapshot => {
                    // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    // const { caption, comments, likes, postImg, postTime, userId } = documentSnapshot.data()

                    list.push({
                        id: documentSnapshot.id,
                        ...documentSnapshot.data()
                    })

                    setDataPosting(list)

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
        // setLoading(true)
    }, [])

    //Nhan biet sau khi navigate ve home screen thi se re-render app
    const isFocused = useIsFocused()
    useEffect(() => {
        fetchPosts()
    }, [isFocused])


    return (
        <LinearGradient colors={[`${colors.secondColor}`, `${colors.thirdColor}`]} style={styles.container}>
            {loading ? <ActivityIndicator size='large' color={colors.primaryColor} animating /> : <FlatList
                data={dataPosting}
                renderItem={({ item }) => <Card items={item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />}
        </LinearGradient>
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