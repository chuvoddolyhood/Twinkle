import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import assets from '../../assets/img'
import colors from '../../assets/colors'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../routes/AuthProvider';

const CardComment = (props) => {
    const { user } = useContext(AuthContext)

    const { id, content, userId } = props.items
    const { idPost, onHandle } = props

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

    const deleteComment = () => {
        if (userId === user.uid) {
            Alert.alert('Delete Comment', 'Would you like to delete this comment?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => deleteCmt() },
            ]);
        } else {
            alert("You can not delete this comment.")
        }
    }

    const deleteCmt = async () => {
        try {
            await firestore()
                .collection('posts')
                .doc(idPost)
                .collection('comments')
                .doc(id)
                .delete()
                .then(() => {
                    console.log('deleted!');
                });
            onHandle()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    // console.log(dataUser);


    return (
        <Pressable onLongPress={deleteComment}>
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
        </Pressable>
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