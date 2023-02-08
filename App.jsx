import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './container/components/authenticate/LoginScreen';
import RegisterScreen from './container/components/authenticate/RegisterScreen';
import OnboardingScreen from './container/components/onboarding/OnboardingScreen';

function App() {
  const Stack = createNativeStackNavigator();
  const [firstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("firstLaunch").then(value => {
      if (value == null) {
        AsyncStorage.setItem("firstLaunch", 'true')
        setFirstLaunch(true)
      } else {
        setFirstLaunch(false)
      }
    })
  }, [])


  // DefaultTheme.colors['text'] = 'red';

  // const MyTheme = {
  //   ...DefaultTheme,
  //   colors: {
  //     ...DefaultTheme.colors,
  //     primary: 'yellow',
  //     background: 'lightblue',
  //     text: 'green',
  //     border: 'red',

  //   },
  // };

  const navTheme = DefaultTheme;
  navTheme.colors.text = 'green';

  return (
    <View style={styles.container}>
      <NavigationContainer theme={navTheme}>
        <SafeAreaProvider>
          <Stack.Navigator>
            {firstLaunch && <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />}
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
