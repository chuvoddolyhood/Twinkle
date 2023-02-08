import { View, Text, Image, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import assets from '../../assets/img';

export default function OnboardingScreen({ navigation }) {
    const backgroundColor = (isLight) => (isLight ? 'white' : 'black');
    const color = (isLight) => backgroundColor(!isLight);

    const Skip = ({ isLight, ...props }) => (
        <TouchableOpacity {...props}>
            <Text style={{ fontSize: 17, marginHorizontal: 20, color: color(isLight) }}>Skip</Text>
        </TouchableOpacity>
    );

    const Next = ({ isLight, ...props }) => (
        <TouchableOpacity {...props}>
            <Text style={{ fontSize: 17, marginHorizontal: 20, color: color(isLight) }}>Next</Text>
        </TouchableOpacity>
    )

    const Done = ({ isLight, ...props }) => {
        return (
            <TouchableOpacity {...props}>
                <Text style={{ fontSize: 17, marginHorizontal: 20, color: color(isLight) }}>Done</Text>
            </TouchableOpacity>
        )
    }

    const Dot = ({ isLight, selected }) => {
        let backgroundColor;

        if (isLight) {
            backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
        } else {
            backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
        }

        let sizeDot = selected ? 7 : 5;

        return (
            <View
                style={{
                    width: sizeDot,
                    height: sizeDot,
                    marginHorizontal: 3,
                    backgroundColor,
                }}
            />
        );
    };

    return (
        <Onboarding
            onSkip={() => navigation.replace("Login")}
            onDone={() => navigation.replace("Login")}

            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dot}

            titleStyles={{ fontSize: 35, fontWeight: 'bold' }}

            pages={[
                {
                    backgroundColor: '#F4E2DA',
                    image: <LottieView source={assets.lottieFiles.img_1} autoPlay loop style={{ width: '55%', alignItems: 'center', justifyContent: 'center' }} />,
                    title: 'Snap a shot',
                    subtitle: 'Explore the world and capture the joy',
                },
                {
                    backgroundColor: '#ff5e72',
                    image: <LottieView source={assets.lottieFiles.img_2} autoPlay loop style={{ width: '80%' }} />,
                    title: 'Make it fabulous',
                    subtitle: '“Nothing makes a woman more beautiful than the belief that she is beautiful.”',
                },
                {
                    backgroundColor: '#fcf4b3',
                    image: <LottieView source={assets.lottieFiles.img_3} autoPlay loop style={{ width: '80%' }} />,
                    title: 'Share it',
                    subtitle: 'Spread the excitement with the world',
                }
            ]}
        />
    )
}