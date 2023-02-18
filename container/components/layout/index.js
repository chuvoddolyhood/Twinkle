import styled from 'styled-components';

export const Container = styled.View`
    flex:1;
    justify-content:center;
    align-items: center;
    background-color:red;
`;



// import React, { Component } from 'react';
// import { View, Image, Text, StyleSheet, Platform, ActivityIndicator } from 'react-native';
// export default class App extends Component<{}> {
//     constructor() {
//         super();
//         this.state = { width: 0, height: 0, loading: true }
//         this.uri = 'https://tutorialscapital.com/wp-content/uploads/2017/09/background.jpg';
//     }

//     componentDidMount() {
//         Image.getSize(
//             this.uri,
//             (width, height) => {
//                 this.setState({ width: width, height: height, loading: false });
//             },
//             (error) => {
//                 this.setState({ loading: false }); console.log(error);
//             });
//     }
//     render() {
//         return (<View style={styles.container}>
//             <View style={styles.imageContainer}> {
//                 (this.state.loading) ?
//                     <ActivityIndicator size="large" /> :
//                     (<Image source={{ uri: this.uri }} style={styles.image} />)}
//                 <View style={styles.showDimensionsView}>
//                     <Text style={styles.text}>{this.state.width}(w) X {this.state.height}(h)</Text>
//                 </View>
//             </View>
//         </View>);
//     }
// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingTop: (Platform.OS === 'ios' ? 20 : 0)
//     },
//     imageContainer: {
//         position: 'relative',
//         width: 200,
//         height: 250, justifyContent: 'center',
//         alignItems: 'center'
//     },
//     image: { resizeMode: 'cover', width: '100%', height: '100%' }, showDimensionsView: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', paddingTop: 15, paddingBottom: 15 }, text: { fontSize: 20, color: 'black', color: 'rgba(255,255,255,0.8)' }
// });