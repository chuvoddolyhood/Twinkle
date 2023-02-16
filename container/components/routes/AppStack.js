import React from 'react'
import { View, Text } from 'react-native'
import HomeScreen from '../home/HomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { faBell, faCamera, faHome, faKey, faMessage, faPlus, faPlusCircle, faPlusMinus, faPlusSquare, faSearch, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import colors from '../../assets/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import ProfileScreen from '../profile/ProfileScreen';
import NotificationScreen from '../notification/NotificationScreen';
import MessageScreen from '../messages/MessageScreen';
import { Pressable } from "react-native";
import SearchScreen from '../search/SearchScreen';

/**
 * 
 * @returns 
 * Organize the screen navigation for main screens
 */

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({ navigation }) => (
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
                        onPress={() => alert('avc')}
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
                        onPress={() => alert('avc')}
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
    </Stack.Navigator>
)

const SearchStack = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen
            name="My Search"
            component={SearchScreen}
            options={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: colors.primaryColor,
                    fontSize: 26,
                    fontWeight: '700'
                },
                headerStyle: {
                    shadowColor: '#fff',
                    elevation: 0,
                },
                headerRight: () => (
                    <Pressable onPress={() => alert('avc')}>
                        <FontAwesomeIcon icon={faPlus} size={20} color={colors.primaryColor} />
                    </Pressable>
                ),
                headerLeft: () => (
                    <Pressable onPress={() => alert('avc')}>
                        <FontAwesomeIcon icon={faCamera} size={20} color={colors.primaryColor} />
                    </Pressable>
                )
            }}
        />
    </Stack.Navigator>
)

const MessageStack = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen
            name="Message"
            component={MessageScreen}
            options={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: colors.primaryColor,
                    fontSize: 26,
                    fontWeight: '700'
                },
                headerStyle: {
                    shadowColor: '#fff',
                    elevation: 0,
                },
                headerRight: () => (
                    <Pressable onPress={() => alert('avc')}>
                        <FontAwesomeIcon icon={faPlus} size={20} color={colors.primaryColor} />
                    </Pressable>
                ),
                headerLeft: () => (
                    <Pressable onPress={() => alert('avc')}>
                        <FontAwesomeIcon icon={faCamera} size={20} color={colors.primaryColor} />
                    </Pressable>
                )
            }}
        />
    </Stack.Navigator>
)

const NotificationStack = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen
            name="Notification"
            component={NotificationScreen}
            options={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: colors.primaryColor,
                    fontSize: 26,
                    fontWeight: '700'
                },
                headerStyle: {
                    shadowColor: '#fff',
                    elevation: 0,
                },
                headerRight: () => (
                    <Pressable onPress={() => alert('avc')}>
                        <FontAwesomeIcon icon={faPlus} size={20} color={colors.primaryColor} />
                    </Pressable>
                ),
                headerLeft: () => (
                    <Pressable onPress={() => alert('avc')}>
                        <FontAwesomeIcon icon={faCamera} size={20} color={colors.primaryColor} />
                    </Pressable>
                )
            }}
        />
    </Stack.Navigator>
)

const ProfileStack = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: colors.primaryColor,
                    fontSize: 26,
                    fontWeight: '700'
                },
                headerStyle: {
                    shadowColor: '#fff',
                    elevation: 0,
                },
                headerRight: () => (
                    <Pressable onPress={() => alert('avc')}>
                        <FontAwesomeIcon icon={faPlus} size={20} color={colors.primaryColor} />
                    </Pressable>
                ),
                headerLeft: () => (
                    <Pressable onPress={() => alert('avc')}>
                        <FontAwesomeIcon icon={faCamera} size={20} color={colors.primaryColor} />
                    </Pressable>
                )
            }}
        />
    </Stack.Navigator>
)

const AppStack = () => {

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={FeedStack}
                options={({ route }) => ({
                    // tabBarLabel: 'Home',
                    tabBarShowLabel: false,
                    headerShown: false,
                    // tabBarVisible: route.state && route.state.index === 0,
                    tabBarIcon: ({ focused, color, size }) => (
                        <FontAwesomeIcon icon={faHome} size={20} color={focused ? colors.primaryColor : colors.iconColor} />
                    ),
                })}

            />
            <Tab.Screen
                name="Seach"
                component={SearchStack}
                options={({ route }) => ({
                    // tabBarLabel: 'Home',
                    tabBarShowLabel: false,
                    headerShown: false,
                    // tabBarVisible: route.state && route.state.index === 0,
                    tabBarIcon: ({ focused, color, size }) => (
                        <FontAwesomeIcon icon={faSearch} size={20} color={focused ? colors.primaryColor : colors.iconColor} />
                    ),
                })}

            />
            <Tab.Screen
                name="MessageScreen"
                component={MessageStack}
                options={({ route }) => ({
                    // tabBarLabel: 'Home',
                    tabBarShowLabel: false,
                    headerShown: false,
                    // tabBarVisible: route.state && route.state.index === 0,
                    tabBarIcon: ({ focused, color, size }) => (
                        <FontAwesomeIcon icon={faMessage} size={20} color={focused ? colors.primaryColor : colors.iconColor} />
                    ),
                })}
            />
            <Tab.Screen
                name="NotificationScreen"
                component={NotificationStack}
                options={({ route }) => ({
                    // tabBarLabel: 'Home',
                    tabBarShowLabel: false,
                    headerShown: false,
                    // tabBarVisible: route.state && route.state.index === 0,
                    tabBarIcon: ({ focused, color, size }) => (
                        <FontAwesomeIcon icon={faBell} size={20} color={focused ? colors.primaryColor : colors.iconColor} />
                    ),
                })}
            />
            <Tab.Screen
                name="ProfileScreen"
                component={ProfileStack}
                options={({ route }) => ({
                    // tabBarLabel: 'Home',
                    tabBarShowLabel: false,
                    headerShown: false,
                    // tabBarVisible: route.state && route.state.index === 0,
                    tabBarIcon: ({ focused, color, size }) => (
                        <FontAwesomeIcon icon={faUserCircle} size={20} color={focused ? colors.primaryColor : colors.iconColor} />
                    ),

                })}
            />
        </Tab.Navigator>
    )
}

export default AppStack