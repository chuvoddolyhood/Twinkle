import { useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';

async function choosePhotoFromLibrary() {
    var imageUri = ''

    try {
        await ImagePicker.openPicker({
            cropping: true,
        }).then((image) => {
            // console.log(image);
            imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            // setImage(imageUri);
        }).catch(err => { console.log(err) });
    } catch (error) {
        console.log(error);
    }

    // console.log(imageUri);
    return imageUri;



    // try {
    //     return new Promise(resolve => {
    //         ImagePicker.openPicker({
    //             cropping: true,
    //         }).then((image) => {
    //             imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
    //             resolve(imageUri)
    //         })
    //     })
    // } catch (error) {
    //     console.log(error);
    // }

    // console.log(imageUri);
}

export default choosePhotoFromLibrary