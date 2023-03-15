import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import assets from '../../assets/img'
import colors from '../../assets/colors'

const CardComment = () => {
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
                <Text style={styles.name}>chuvod.dolyhood</Text>
                <Text style={styles.content}>sadgasfgdafhadghsfgdjh</Text>
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