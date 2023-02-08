import { StyleSheet } from "react-native";
import colors from "../../assets/colors";

const AuthenticateStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        marginHorizontal: 20,
        // backgroundColor: 'red'
    },
    header: {
        flex: 1,
        // backgroundColor: 'red',
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        flex: 2,
        // backgroundColor: 'green',
    },
    heading: {
        alignSelf: 'center',
        // color: 'black'
    },
    form: {
        marginTop: 30
    },
    belowButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signupText: {
        color: colors.primaryColor,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontStyle: 'italic'
    }
})

export default AuthenticateStyle