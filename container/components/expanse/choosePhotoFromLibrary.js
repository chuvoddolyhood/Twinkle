import ImagePicker from 'react-native-image-crop-picker';

function choosePhotoFromLibrary() {
    var imageUri;
    try {
        ImagePicker.openPicker({
            cropping: true,
        }).then((image) => {
            // console.log(image);
            imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            // setImage(imageUri);
            // console.log(imageUri);
        }).catch(err => { console.log(err) });
    } catch (error) {
        console.log(error);
    }
}

export default choosePhotoFromLibrary