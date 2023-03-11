import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import assets from '../../assets/img'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import colors from '../../assets/colors'

const SearchCard = (props) => {
    const { imgURL, name, nickname } = props.user

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.image}>
                    {name && <Image
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 30,
                            resizeMode: 'cover',
                        }}
                        source={imgURL ? { uri: imgURL } : assets.photo.img_5}
                    />}
                </View>
                <View style={styles.nameArea}>
                    <Text style={styles.name}>{name}</Text>
                    {nickname && <Text style={styles.nickname}>@{nickname}</Text>}
                </View>
            </View>
            <View>
                <FontAwesomeIcon
                    icon={faClose}
                    size={20}
                    color={colors.iconColor}
                />
            </View>
        </View>
    )
}

export default SearchCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
    },
    content: {
        flexDirection: 'row',
    },
    image: {
        marginRight: 10
    },
    nameArea: {
        justifyContent: 'center',
    },
    name: {
        color: colors.blackColor,
        fontSize: 16,
        fontWeight: '700'
    },
    nickname: {
        color: colors.blackColor,
        fontSize: 14,
    }
})