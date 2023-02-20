import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../home/HomeScreen';
import { Pressable, PermissionsAndroid } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import colors from '../../../assets/colors';
import { faCamera, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import PostingScreen from '../../PostingScreen/PostingScreen';
import { takePhotoFromCamera } from '../../expanse';

const FeedStack = () => {
    const Stack = createNativeStackNavigator();

    const navigation = useNavigation();

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