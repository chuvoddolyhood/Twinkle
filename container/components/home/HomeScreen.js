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
                <Card url={assets.photo.img_1} location='Tu Duc Tomb, Hue, Vietnam' heart={true} uri='https://firebasestorage.googleapis.com/v0/b/twinkle-chuhoodtech.appspot.com/o/img-5836.jpg?alt=media&token=214fba0a-969d-4931-bccc-24e5a2eb1c83' />
                <Card url={assets.photo.img_2} location='Hoi An, Vietnam' heart={false} uri='https://firebasestorage.googleapis.com/v0/b/twinkle-chuhoodtech.appspot.com/o/beauty_1668763456636%20(1).JPG?alt=media&token=99edff47-83e4-4762-afd9-778ad42865c0' />
                <Card url={assets.photo.img_2} location='Ancient capital of Hue, Hue, Vietnam' heart={false} uri='https://firebasestorage.googleapis.com/v0/b/twinkle-chuhoodtech.appspot.com/o/beauty_1668910746321%20(1).JPG?alt=media&token=83e70f68-48ea-4cc5-a849-6066c58dfa13' />
                <Card url={assets.photo.img_3} location='Tam Giang, Hue, Vietnam' heart={true} uri='https://firebasestorage.googleapis.com/v0/b/twinkle-chuhoodtech.appspot.com/o/IMG_6265%20(1).JPG?alt=media&token=2897715e-3a04-46cf-abb3-dad5dfe41dc1' />

            </ScrollView>
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