import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import colors from '../../assets/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsis, faSearch } from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import { SearchInput } from '../expanse';
import firestore from '@react-native-firebase/firestore';
import SearchCard from '../expanse/SearchCard';

const SearchScreen = () => {

    //Set number 1 cause dont permit query
    const [txtSearch, setTxtSearch] = useState('1')
    const [dataUser, setDataUser] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchUser = async (txt) => {
        list = [];
        try {
            await firestore().collection('users').orderBy('name', 'asc').startAt(txt ? txt : '1').endAt(`${txt ? txt : '1'}\uf8ff`).get().then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    // console.log(documentSnapshot.data());
                    // setDataUser(documentSnapshot.data())

                    list.push({
                        id: documentSnapshot.id,
                        ...documentSnapshot.data()
                    })
                });
            });
            setDataUser(list)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser(txtSearch)

        if (dataUser) {
            setLoading(true)
        }

        if (txtSearch === null || txtSearch === '') {
            setDataUser([])
            setLoading(false)
        }
    }, [txtSearch])

    // console.log('txtSearch', txtSearch, loading, 'dataUser', dataUser);

    const setSearch = (text) => {
        setTxtSearch(text)
        setDataUser([])
    }

    return (
        <LinearGradient colors={[`${colors.secondColor}`, `${colors.thirdColor}`]} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Searching</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                    <View style={styles.backgroundIcon}>
                        <FontAwesomeIcon icon={faEllipsis} size={20} color={colors.primaryColor} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <SearchInput
                    title="Search..."
                    icon={faSearch}
                    onChangeText={setSearch}
                />
                {loading &&
                    <FlatList
                        data={dataUser}
                        renderItem={({ item }) => <SearchCard user={item} />}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                    />
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
        paddingTop: 10,
        paddingHorizontal: 20
    },
})

export default SearchScreen