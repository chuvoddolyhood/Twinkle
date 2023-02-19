import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../home/HomeScreen';
import { Pressable, PermissionsAndroid } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import colors from '../../../assets/colors';
import { faCamera, faPlus } from '@fortawesome/free-solid-svg-icons';
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import PostingScreen from '../../PostingScreen/PostingScreen';

const FeedStack = () => {
    const Stack = createNativeStackNavigator();

    const [image, setImage] = useState(null);

    const navigation = useNavigation();

    const takePhotoFromCamera = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            console.log('granted', granted);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
                ImagePicker.openCamera({
                    cropping: true,
                }).then((image) => {
                    console.log(image);
                    const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
                    setImage(imageUri);
                });
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.log(err);
        }
    };

    console.log("camera", image);

    const choosePhotoFromLibrary = () => {
        try {
            ImagePicker.openPicker({
                cropping: true,
            }).then((image) => {
                console.log(image);
                const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
                setImage(imageUri);
            }).catch(err => { console.log(err) });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="My Feed"
                component={HomeScreen}
                options={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: colors.headingColor,
                        fontSize: 26,
                        fontWeight: '700'
                    },
                    headerStyle: {
                        backgroundColor: colors.secondColor,
                        shadowColor: '#fff',
                        elevation: 0,
                    },
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate('Posting')}
                            style={{
                                backgroundColor: colors.backgroundIcon,
                                padding: 5,
                                borderRadius: 8,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus} size={20} color={colors.primaryColor} />
                        </Pressable>
                    ),
                    headerLeft: () => (
                        <Pressable
                            onPress={takePhotoFromCamera}
                            style={{
                                backgroundColor: colors.backgroundIcon,
                                padding: 5,
                                borderRadius: 8,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <FontAwesomeIcon icon={faCamera} size={20} color={colors.primaryColor} />
                        </Pressable>
                    )
                }}
            />
            <Stack.Screen
                name="Posting"
                component={PostingScreen}
                options={{ headerShown: false }}
            >
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default FeedStack