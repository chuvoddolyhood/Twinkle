import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import theme from '../../assets/theme/theme';

const Gallery = (props) => {
    const { id, caption, comments, likes, postImg, postTime, userId } = props.items

    const getURLImage = () => {
        props.onChoose(postImg)
    }

    return (
        <TouchableOpacity
            style={{ paddingBottom: 2 }}
            onLongPress={getURLImage}
            onPressOut={props.onUnChoose}
            onPress={props.onPress}
        >
            <Image
                source={{ uri: postImg }}
                resizeMode='cover'
                style={{
                    width: (theme.dimension.windowHeight - 40) / 6.5,
                    height: (theme.dimension.windowHeight - 40) / 6.5,
                    borderRadius: 5
                }}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    body: {
        marginVertical: 8
    },

})

export default Gallery