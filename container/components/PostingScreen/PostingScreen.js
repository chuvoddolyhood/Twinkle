import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong, faCameraRetro, faGlobeAsia, faImage, faMapMarkerAlt, faTag } from '@fortawesome/free-solid-svg-icons';
import assets from '../../assets/img';
import { useNavigation } from '@react-navigation/native';
import { choosePhotoFromLibrary, takePhotoFromCamera } from '../expanse';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const PostingScreen = () => {
    const navigation = useNavigation();
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    //Chua nghi ra cach toi uu
    const choosePhotoFromLibrary = () => {
        try {
            ImagePicker.openPicker({
                cropping: true,
            }).then((image) => {
                // console.log(image);
                imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
                setImage(imageUri);
            }).catch(err => { console.log(err) });
        } catch (error) {
            console.log(error);
        }
    }

    const submitPost = async () => {
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        setUploading(true);
        setTransferred(0);

        const storageRef = storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadUri);

        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );

            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });

        try {
            await task;

            const url = await storageRef.getDownloadURL();

            setUploading(false);
            setImage(null);

            Alert.alert(
                'Image uploaded!',
                'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
            );
            return url;

        } catch (e) {
            console.log(e);
            return null;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon={faArrowLeftLong} size={25} color={colors.primaryColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={submitPost}>
                    <View style={styles.backgroundPost}>
                        <Text style={styles.post} >Post</Text>
                    </View>
                </TouchableOpacity>
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
                    style={styles.inputPost}
                />
                <View style={styles.containerImgPost}>
                    {image &&
                        <Image
                            source={{ uri: image }}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 10,
                                resizeMode: 'cover',
                                marginRight: 10
                            }}
                        />}
                </View>
            </View>
            <View style={styles.footer}>
                <View style={styles.postVisibility}>
                    <FontAwesomeIcon icon={faGlobeAsia} size={20} color={colors.blackColor} style={{ marginRight: 10 }} />
                    <Text style={styles.textPostVisibility}>Public</Text>
                </View>
                <View style={styles.entity}>
                    <TouchableOpacity onPress={choosePhotoFromLibrary}>
                        <FontAwesomeIcon icon={faImage} size={22} color={colors.imageIcon} style={{ marginRight: 20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={takePhotoFromCamera}>
                        <FontAwesomeIcon icon={faCameraRetro} size={22} color={colors.cameraIcon} style={{ marginRight: 20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faTag} size={22} color={colors.tagIcon} style={{ marginRight: 20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faMapMarkerAlt} size={22} color={colors.mapIcon} style={{ marginRight: 20 }} />
                    </TouchableOpacity>
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
    inputPost: {
        fontSize: 17,
        textAlignVertical: 'top',
        flex: 1,
    },
    containerImgPost: {
        flex: 1,
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