import { PermissionsAndroid } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';

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
                console.log(imageUri);
                // setImage(imageUri);
            });
        } else {
            console.log('Camera permission denied');
        }
    } catch (err) {
        console.log(err);
    }
}

export default takePhotoFromCamera