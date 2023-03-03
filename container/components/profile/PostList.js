import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../../assets/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../routes/AuthProvider'
import Card from '../home/Card'
import { useNavigation } from '@react-navigation/native';

const PostList = () => {
    const { user, logOut } = useContext(AuthContext)
    const [dataPosting, setDataPosting] = useState([])
    const [loading, setLoading] = useState(true)

    const navigation = useNavigation();

    const fetchPosts = async () => {
        list = [];
        try {
            await firestore().collection('posts').where('userId', '==', user.uid).orderBy('postTime', 'desc').get().then(querySnapshot => {
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

    return (
        <LinearGradient colors={[`${colors.secondColor}`, `${colors.thirdColor}`]} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <View style={styles.backgroundIcon} >
                        <FontAwesomeIcon icon={faArrowCircleLeft} size={20} color={colors.primaryColor} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.heading}>Posts</Text>
            </View>
            <View style={styles.body}>
                {loading ? <ActivityIndicator size='large' color={colors.primaryColor} animating /> : <FlatList
                    data={dataPosting}
                    renderItem={({ item }) => <Card items={item} />}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
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
    body: {
        flex: 10,
        paddingHorizontal: 20,
    },
})

export default PostList