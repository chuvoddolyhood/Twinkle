import { View, Text, StatusBar, Image } from 'react-native'
import React from 'react'
import theme from '../../assets/theme/theme'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faComment, faHeart, faShare } from '@fortawesome/free-solid-svg-icons'
import colors from '../../assets/colors'

const PhotoPreview = (props) => {
    const { photo } = props

    return (
        <View
            style={{
                position: 'absolute',
                zIndex: 100,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(52,52,52,0.8)',
            }}>
            <StatusBar backgroundColor="#525252" barStyle="dark-content" />
            <View
                style={{
                    position: 'absolute',
                    top: theme.dimension.windowHeight / 6,
                    left: theme.dimension.windowWidth / 18,
                    backgroundColor: 'white',
                    width: '90%',
                    height: 465,
                    borderRadius: 15,
                    zIndex: 1,
                    elevation: 50,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                    }}>
                    <Image
                        source={{ uri: photo }}
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 100,
                        }}
                    />
                    <View style={{ paddingLeft: 8 }}>
                        <Text style={{ fontSize: 12, fontWeight: '600' }}>
                            the_anonymous_guy
                        </Text>
                    </View>
                </View>
                <Image source={{ uri: photo }} style={{ width: '100%', height: '80%' }} />
                <View
                    style={{
                        justifyContent: 'space-around',
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 8,
                    }}>

                    <FontAwesomeIcon icon={faHeart} size={20} color={colors.primaryColor} style={{ borderColor: colors.blackColor }} />
                    <FontAwesomeIcon icon={faComment} size={20} color={colors.primaryColor} />
                    <FontAwesomeIcon icon={faShare} size={20} color={colors.primaryColor} />
                </View>
            </View>
        </View>
    )
}

export default PhotoPreview