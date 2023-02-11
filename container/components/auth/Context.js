import React from "react";
import { ExampleContext } from "./ContextDemo";
import { View, Text } from 'react-native'

const ChildComponent = () => {
    const { color, user, setUser } = React.useContext(ExampleContext);

    return (
        <View>
            <Text>
                This text is {color} {user}

            </Text>

            <Text onPress={() => setUser(user + 1)}>abc</Text>
        </View>
    );
};

export default ChildComponent;
