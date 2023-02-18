import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import colors from '../../assets/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment, faHeart, faLocationDot, faShare } from '@fortawesome/free-solid-svg-icons';
import assets from '../../assets/img';


const Card = ({ url, location, heart, uri }) => {
    const [loading, setLoading] = useState(false)
    const [height, setHeight] = useState(0);
    var imageURL = 'https://reactnative-examples.com/wp-content/uploads/2022/02/earth.jpg';

    var urlTemp = './../../assets/img/img-5836.jpg';
    // console.log("urlTemp", urlTemp);

    // var uri = 'https://tutorialscapital.com/wp-content/uploads/2017/09/background.jpg';

    var tempURL = 'https://firebasestorage.googleapis.com/v0/b/fir-d6633.appspot.com/o/anhthe.png?alt=media&token=cce7d1d0-5e09-4af0-8140-e3f1611a51ed'
    useEffect(() => {
        Image.getSize(uri, (width, height) => {
            setHeight(height);
            setLoading(true)
        }, (errorMsg) => {
            console.log(errorMsg);
        });
    }, [])

    console.log(height);

    return (
        <View style={styles.cardContainer}>
            <View style={styles.header}>
                <View style={styles.containerAvatarText}>
                    <Image
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 14,
                            resizeMode: 'cover',
                            marginRight: 10
                        }}
                        source={require('./../../assets/img/anhthe.png')}
                    />
                    <View style={styles.containerAllText}>
                        <Text style={styles.textName}>chuvod.dolyhood</Text>
                        <View style={styles.containerNameLocation}>
                            <View style={styles.containerLocationTime}>
                                <FontAwesomeIcon icon={faLocationDot} size={12} color={colors.iconColor} />
                            </View>
                            <Text style={styles.textLocationTime}>{location}   •   2m ago</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faShare} size={20} color={colors.iconColor} />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <Text style={styles.caption}>New day is good day.</Text>
                {loading && <Image
                    // source={url}
                    source={{ uri: uri }}
                    resizeMode='cover'
                    style={{
                        width: '100%',
                        height: height / 4,
                        borderRadius: 15
                    }}
                />}
            </View>
            <View style={styles.footer}>
                <View style={[styles.containerImgFunc, { backgroundColor: colors.backgroundHeart, }]}>
                    <FontAwesomeIcon icon={faHeart} size={20} color={heart ? colors.heartColor : colors.textColor} style={styles.iconFunc} />
                    <Text style={styles.textFunc}>211</Text>
                </View>
                <View style={[styles.containerImgFunc, { backgroundColor: colors.backgroundComment, }]}>
                    <FontAwesomeIcon icon={faComment} size={20} color={colors.commentColor} style={styles.iconFunc} />
                    <Text style={styles.textFunc}>150</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginVertical: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerAvatarText: {
        flexDirection: 'row',
    },
    containerAllText: {
        width: '80%'
    },
    containerLocationTime: {
        height: '100%',
        paddingTop: 2,
        marginRight: 5
    },
    textName: {
        color: colors.blackColor,
        fontSize: 16,
        fontWeight: '700'
    },
    containerNameLocation: {
        flexDirection: 'row',
        paddingRight: 3,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textLocationTime: {
        fontSize: 12,
        fontWeight: '500'
        // backgroundColor: 'red',
    },
    body: {
        // backgroundColor: 'yellow',
        marginVertical: 8
    },
    // containerImage: {
    //     padding: 5,
    //     backgroundColor: 'red',
    //     alignItems: 'center'
    // },
    caption: {
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 5
    },
    footer: {
        flexDirection: 'row',
        // backgroundColor: 'blue'
    },
    containerImgFunc: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginRight: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconFunc: {
        marginRight: 5
    },
    textFunc: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default Card