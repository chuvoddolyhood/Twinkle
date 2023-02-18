import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useContext } from 'react'

import { AuthContext } from '../routes/AuthProvider'
import colors from '../../assets/colors'
import LinearGradient from 'react-native-linear-gradient'
import Card from './Card'
import { FlatList } from 'react-navigation'
import assets from '../../assets/img'

const HomeScreen = () => {
    const { user, logOut } = useContext(AuthContext)

    return (
        <LinearGradient colors={[`${colors.secondColor}`, `${colors.thirdColor}`]} style={styles.container}>
            {/* <FlatList
                renderItem={({ item, index }) => <Card key={index} />}
            /> */}



            <ScrollView showsVerticalScrollIndicator={false}>
                <Card url={assets.photo.img_1} location='Tu Duc Tomb, Hue, Vietnam' />
                <Card url={assets.photo.img_2} location='Ancient capital of Hue, Hue, Vietnam' />
                <Card url={assets.photo.img_3} location='Cantho City, Vietnam' />
            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20
    },
    text: {
        color: colors.whiteColor,
        alignSelf: 'center'
    }
});

export default HomeScreen