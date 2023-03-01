import { Dimensions } from 'react-native';
const theme = {
    light: {
        color: 'black',
        background: 'white'
    },
    dark: {
        color: 'white',
        background: 'black'
    },
    dimension: {
        windowWidth: Dimensions.get('window').width,
        windowHeight: Dimensions.get('window').height,
    }
}

export default theme