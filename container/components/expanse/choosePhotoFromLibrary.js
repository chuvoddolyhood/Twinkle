import ImagePicker from 'react-native-image-crop-picker';

const choosePhotoFromLibrary = async () => {
    // try {
    //     await ImagePicker.openPicker({
    //         cropping: true,
    //     }).then((image) => {
    //         // console.log(image);
    //         const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
    //         // setImage(imageUri);
    //         return imageUri
    //     }).catch(err => { console.log(err) });
    // } catch (error) {
    //     console.log(error);
    //     return null
    // }

    //Da giai quyet van de :)
    try {
        const img = await ImagePicker.openPicker({
            cropping: true,
        })
        return img.path
    } catch (error) {
        console.log(error);
        return null
    }
}

export default choosePhotoFromLibrary