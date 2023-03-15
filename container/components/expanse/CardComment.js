import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import assets from '../../assets/img'
import colors from '../../assets/colors'
import firestore from '@react-native-firebase/firestore';

const CardComment = (props) => {
    const { content, userId } = props.items
    const [dataUser, setDataUser] = useState([])

    const fetchUser = async () => {
        try {
            await firestore()
                .collection('users')
                .where('userId', '==', userId)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {
                        setDataUser(documentSnapshot.data())
                    });
                });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    // console.log(dataUser);


    return (
        <View style={styles.container}>
            <Image
                style={{
                    width: 35,
                    height: 35,
                    borderRadius: 12,
                    resizeMode: 'cover',
                    marginRight: 10
                }}
                source={assets.photo.img_5}
            />
            <View>
                <Text style={styles.name}>{dataUser.name}</Text>
                <Text style={styles.content}>{content}</Text>
            </View>
        </View>
    )
}

export default CardComment

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 8
    },
    name: {
        color: colors.blackColor,
        fontSize: 14,
        fontWeight: '700'
    },
    content: {
        fontSize: 12,
        fontWeight: '500'
    }
})