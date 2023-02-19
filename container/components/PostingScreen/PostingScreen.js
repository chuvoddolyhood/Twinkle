import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../assets/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong, faCameraRetro, faGlobeAsia, faImage, faMapMarkerAlt, faTag } from '@fortawesome/free-solid-svg-icons';
import assets from '../../assets/img';
import { useNavigation } from '@react-navigation/native';

const PostingScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon={faArrowLeftLong} size={25} color={colors.primaryColor} />
                </TouchableOpacity>
                <View style={styles.backgroundPost}>
                    <Text style={styles.post}>Post</Text>
                </View>
            </View>
            <View style={styles.body}>
                <Image
                    source={assets.photo.img_3}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        resizeMode: 'cover',
                        marginRight: 10
                    }}
                />
                <TextInput
                    placeholder={"What is on your mind?"}
                    style={{ fontSize: 17 }}
                />
            </View>
            <View style={styles.footer}>
                <View style={styles.postVisibility}>
                    <FontAwesomeIcon icon={faGlobeAsia} size={20} color={colors.blackColor} style={{ marginRight: 10 }} />
                    <Text style={styles.textPostVisibility}>Public</Text>
                </View>
                <View style={styles.entity}>
                    <FontAwesomeIcon icon={faImage} size={22} color={colors.imageIcon} style={{ marginRight: 20 }} />
                    <FontAwesomeIcon icon={faCameraRetro} size={22} color={colors.cameraIcon} style={{ marginRight: 20 }} />
                    <FontAwesomeIcon icon={faTag} size={22} color={colors.tagIcon} style={{ marginRight: 20 }} />
                    <FontAwesomeIcon icon={faMapMarkerAlt} size={22} color={colors.mapIcon} style={{ marginRight: 20 }} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'red',
        flex: 1,
        paddingHorizontal: 10
    },
    backgroundPost: {
        backgroundColor: colors.primaryColor,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20
    },
    post: {
        fontSize: 18,
        color: colors.whiteColor,
        fontWeight: '600'
    },
    body: {
        // backgroundColor: 'grey',
        flex: 12,
        paddingHorizontal: 10,
        paddingTop: 10
    },
    footer: {
        // backgroundColor: 'green',
        flex: 2
    },
    postVisibility: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        elevation: 1,
        paddingLeft: 10
    },
    textPostVisibility: {
        fontSize: 16,
        fontWeight: '700'
    },
    entity: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingLeft: 10
    }
});

export default PostingScreen