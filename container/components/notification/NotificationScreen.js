import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../../assets/colors'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import NotiCard from './NotiCard'
import { AuthContext } from '../routes/AuthProvider'
import firestore from '@react-native-firebase/firestore';
import theme from '../../assets/theme/theme'

const NotificationScreen = () => {
    const { user } = useContext(AuthContext)

    const [dataNoti_Like, setDataNoti_Like] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchNoti_Like = async () => {
        const list = [];
        try {
            await firestore()
                .collection('notifications')
                .doc(user.uid)
                .collection('noti')
                .orderBy('createdAt', 'desc')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {
                        list.push({
                            id: documentSnapshot.id,
                            ...documentSnapshot.data()
                        })
                    });
                });

            setDataNoti_Like(list.filter(item => item.userId !== user.uid))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchNoti_Like()

        if (dataNoti_Like) {
            setLoading(false)
        }

    }, [])

    // console.log('====================', loading, dataNoti_Like);

    return (
        <LinearGradient colors={[`${colors.secondColor}`, `${colors.thirdColor}`]} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Notifications</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                    <View style={styles.backgroundIcon}>
                        <FontAwesomeIcon icon={faEllipsis} size={20} color={colors.primaryColor} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.scrollContainer}>
                {/* <Text>{dataNoti_Like.createdAt}</Text> */}
                {loading ? <ActivityIndicator size='large' color={colors.primaryColor} animating /> :
                    <>
                        {dataNoti_Like.length !== 0 ?
                            <FlatList
                                data={dataNoti_Like}
                                renderItem={({ item }) => <NotiCard items={item} />}
                                keyExtractor={item => item.id}
                                showsVerticalScrollIndicator={false}
                            /> :
                            <View style={{ alignItems: 'center', justifyContent: 'center', height: theme.dimension.windowHeight / 1.5 }}>
                                <Text>No posts yet.</Text>
                            </View>}
                    </>
                }
            </View>
        </LinearGradient>
    )
}

export default NotificationScreen

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
    scrollContainer: {
        flex: 10,
        paddingHorizontal: 20,
        paddingTop: 15
    },
})