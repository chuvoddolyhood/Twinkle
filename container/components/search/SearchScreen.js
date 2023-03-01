import { View, Text, SafeAreaView, ScrollView, StyleSheet, Animated, Easing, StatusBar, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import colors from '../../assets/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowCircleRight, faBarcode, faBell, faMoneyCheck, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import Following from './Following';

var WINDOW_HEIGHT = Dimensions.get('window').height;
var WINDOW_WIDTH = Dimensions.get('window').width;

const SearchScreen = () => {

    //vertical scroll 
    const animatedValue = useRef(new Animated.Value(0)).current;

    //Nhan biet scroll down or scroll up
    const scrollViewRef = useRef();
    //Luu gia tri lan scroll truoc do
    const lastOffsetY = useRef(0)
    const scrollDirection = useRef('')

    const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

    console.log('scroll', scrollViewRef.current);

    //Event for Search TextInput
    const searchInputAnimation = {
        transform: [
            {
                //0: chua scroll -> textInput van bth. Cang scroll thi gia tri tang len -> textInput bien mat
                scaleX: animatedValue.interpolate({
                    inputRange: [0, 50],
                    outputRange: [1, 0],
                    extrapolate: 'clamp'
                })
            },
            {
                //Cang scroll xuong-> gia tri tang len -> textInput se di chuyen qua ben trai (-100)
                translateX: animatedValue.interpolate({
                    inputRange: [0, 25],
                    outputRange: [0, -110],
                    extrapolate: 'clamp'
                })
            },
        ],
        //Cang scroll xuong-> gia tri tang len -> textInput tu dam thanh mo
        opacity: animatedValue.interpolate({
            inputRange: [0, 25],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        })
    }

    //Event for featureName
    const featureNameAnimation = {
        transform: [
            {
                //0: chua scroll -> textInput van bth. Cang scroll thi gia tri tang len -> textInput bien mat
                scaleX: animatedValue.interpolate({
                    inputRange: [0, 30],
                    outputRange: [1, 0],
                    extrapolate: 'clamp'
                })
            }
        ],
        //Cang scroll xuong-> gia tri tang len -> textInput tu dam thanh mo
        opacity: animatedValue.interpolate({
            inputRange: [0, 30],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        })
    }

    //Event for NapTien
    const NapTienAnimation = {
        transform: [
            {
                translateX: animatedValue.interpolate({
                    inputRange: [0, 80],
                    outputRange: [0, 30],
                    extrapolate: 'clamp'
                })
            },
            {
                translateY: animatedValue.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, -50],
                    extrapolate: 'clamp'
                })
            },
        ],
    }

    const animatedIcon = {
        //Cang scroll xuong-> gia tri tang len -> textInput tu dam thanh mo
        opacity: animatedValue.interpolate({
            inputRange: [0, 25],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        })
    }

    const animatedIconHeader = {
        transform: [
            {
                translateY: animatedValue.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 23],
                    extrapolate: 'clamp'
                })
            },
        ],
        //Cang scroll xuong-> gia tri tang len -> textInput tu dam thanh mo
        opacity: animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })
    }


    return (
        <View style={styles.container}>
            <StatusBar barStyle={"light-content"} />
            <SafeAreaView>
                <View style={styles.upperHeaderPlaceHolder}>
                    <View style={styles.upperHeader} >
                        <View style={styles.searchContainer}>
                            <FontAwesomeIcon icon={faSearch} size={16} color={colors.whiteColor} style={{ marginLeft: 8 }} />
                            <AnimatedTextInput
                                placeholder='Tim kiem'
                                placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
                                style={[styles.searchInput, searchInputAnimation]}
                            />
                        </View>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}> */}
                        <Animated.View style={[animatedIconHeader, { position: 'absolute', top: -10, left: 70 }]}>
                            <FontAwesomeIcon icon={faArrowCircleRight} size={16} color={colors.whiteColor} style={{ marginHorizontal: 32 }} />
                        </Animated.View>
                        <Animated.View style={[animatedIconHeader, { position: 'absolute', top: -10, left: 140 }]}>
                            <FontAwesomeIcon icon={faBarcode} size={16} color={colors.whiteColor} style={{ marginHorizontal: 32 }} />
                        </Animated.View>
                        <Animated.View style={[animatedIconHeader, { position: 'absolute', top: -10, left: 210 }]}>
                            <FontAwesomeIcon icon={faMoneyCheck} size={16} color={colors.whiteColor} style={{ marginHorizontal: 32 }} />
                        </Animated.View>
                        {/* </View> */}
                        <FontAwesomeIcon icon={faBell} size={16} color={colors.whiteColor} style={{ marginHorizontal: 32 }} />

                        <FontAwesomeIcon icon={faUser} size={16} color={colors.whiteColor} />
                    </View>
                </View>
            </SafeAreaView>
            <ScrollView
                onScroll={e => {
                    //scroll doc
                    const offsetY = e.nativeEvent.contentOffset.y;
                    animatedValue.setValue(offsetY)
                    scrollDirection.current = offsetY - lastOffsetY.current > 0 ? 'down' : 'up';
                    lastOffsetY.current = offsetY
                }}
                scrollEventThrottle={16}
                ref={scrollViewRef}
                onScrollEndDrag={() => {
                    // console.log(scrollDirection.current);
                    scrollViewRef.current.scrollTo({
                        y: scrollDirection.current === 'down' ? 100 : 0,
                        animated: true
                    });
                }}

            >
                <View style={styles.lowerHeader}>
                    <Animated.View style={[styles.feature, NapTienAnimation]}>
                        <TouchableOpacity onPress={() => { console.log('abc'); }}>
                            <Animated.View style={animatedIcon}>
                                <FontAwesomeIcon icon={faArrowCircleRight} size={25} color={colors.whiteColor} style={styles.featureIconCircle} />
                            </Animated.View>
                        </TouchableOpacity>

                        {/* <Animated.View style={[styles.featureIcon, animatedIconHeader]}>
                            <FontAwesomeIcon icon={faArrowCircleRight} size={16} color={colors.whiteColor} />
                        </Animated.View> */}

                        <Animated.Text style={[styles.featureName, featureNameAnimation]}>Nap Tien</Animated.Text>
                    </Animated.View>

                    <View style={styles.feature}>
                        <Animated.View style={animatedIcon}>
                            <FontAwesomeIcon icon={faBarcode} size={25} color={colors.whiteColor} style={styles.featureIconCircle} />
                        </Animated.View>
                        {/* <FontAwesomeIcon icon={faBarcode} size={16} color={colors.whiteColor} style={styles.featureIcon} /> */}
                        <Animated.Text style={[styles.featureName, featureNameAnimation]}>Quet Ma</Animated.Text>
                    </View>
                    <View style={styles.feature}>
                        <Animated.View style={animatedIcon}>
                            <FontAwesomeIcon icon={faMoneyCheck} size={25} color={colors.whiteColor} style={styles.featureIconCircle} />
                        </Animated.View>
                        {/* <FontAwesomeIcon icon={faMoneyCheck} size={16} color={colors.whiteColor} style={styles.featureIcon} /> */}
                        <Animated.Text style={[styles.featureName, featureNameAnimation]}>Thanh Toan</Animated.Text>
                    </View>
                </View>
                <View style={styles.scrollViewContent}>
                    <Text>abc</Text>
                    <Following />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    upperHeaderPlaceHolder: {
        backgroundColor: '#af0c6e'
    },

    upperHeader: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        // position: 'absolute'

    },
    searchContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    searchInput: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.3)',
        color: colors.whiteColor,
        borderRadius: 4,
        paddingVertical: 2,
        paddingLeft: 32
    },
    lowerHeader: {
        height: 96,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 16,
        width: '100%',
        backgroundColor: '#af0c6e'
    },
    feature: {
        alignItems: "center"
    },
    featureName: {
        color: colors.whiteColor
    },
    featureIcon: {
        position: 'absolute',
        top: 8
    },
    scrollViewContent: {
        height: WINDOW_HEIGHT * 2,
        backgroundColor: 'white',
    }
})

export default SearchScreen