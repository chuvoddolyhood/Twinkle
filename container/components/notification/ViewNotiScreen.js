import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../../assets/colors'
import { faArrowLeft, faArrowLeftLong, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Card from '../home/Card'
import firestore from '@react-native-firebase/firestore';

const ViewNotiScreen = ({ route, navigation }) => {
    const { createdAt, id, postId, userId, type } = route.params.items;

    const [dataPosting, setDataPosting] = useState([])

    // console.log(postId, id, dataPosting);

    const fetchPosts = async () => {
        try {
            await firestore()
                .collection('posts')
                .doc(postId)
                .get()
                .then(documentSnapshot => {
                    setDataPosting({
                        id: documentSnapshot.id,
                        ...documentSnapshot.data()
                    });
                });
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
                <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                    <View style={styles.backgroundIcon}>
                        <FontAwesomeIcon icon={faArrowLeft} size={20} color={colors.primaryColor} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.heading}>Your post</Text>
            </View>
            <View style={styles.body}>
                {dataPosting.length === 0 ? <ActivityIndicator size='large' color={colors.primaryColor} animating /> : <Card items={dataPosting} />}
            </View>
        </LinearGradient>
    )
}

export default ViewNotiScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        backgroundColor: colors.secondColor,
        flexDirection: 'row',
        alignItems: 'center',
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
        fontWeight: '700',
        marginLeft: 15
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