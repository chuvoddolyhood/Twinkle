import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import assets from '../../assets/img'
import colors from '../../assets/colors'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import moment from 'moment'
import firestore from '@react-native-firebase/firestore';

const NotiCard = (props) => {

    const { createdAt, id, postId, userId, type } = props.items

    const [loading, setLoading] = useState(false)
    const [dataUser, setDataUser] = useState([])

    const fetchUser = async () => {
        try {
            await firestore()
                .collection('users')
                .where('userId', '==', userId)
                .get()
                .then(querySnapshot => {
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

        if (dataUser) {
            setLoading(true)
        }
    }, [])

    // console.log(dataUser);

    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={{
                        width: 45,
                        height: 45,
                        borderRadius: 14,
                        resizeMode: 'cover',
                        marginRight: 10
                    }}
                    source={dataUser.imgURL ? { uri: dataUser.imgURL } : assets.photo.img_5}
                />
                <View style={[styles.containerIcon, { backgroundColor: (type === 'like') ? colors.heartColor : colors.commentColor }]}>
                    <FontAwesomeIcon icon={(type === 'like') ? faHeart : faComment} size={10} color={colors.whiteColor} />
                </View>
            </View>
            <View>
                <Text style={styles.time}>{moment(createdAt.toDate()).fromNow()}</Text>
                <Text style={styles.content}>{dataUser.name}
                    {
                        (type === 'like') ?
                            ' liked your post'
                            : ' commented on your post'
                    }
                </Text>
            </View>
        </View>
    )
}

export default NotiCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 5
    },
    time: {
        fontSize: 11,
        color: colors.blackColor
    },
    content: {
        fontSize: 16,
        color: colors.blackColor
    },
    containerIcon: {
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginLeft: 30,
        marginTop: -10
    }
})