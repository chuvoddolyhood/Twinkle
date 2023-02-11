import React, { useState } from "react";
import ChildComponent from "./Context";
import LoginScreen from "./LoginScreen";

export const ExampleContext = React.createContext();

const App = () => {
    const [user, setUser] = useState(0);

    return (
        <ExampleContext.Provider
            value={{
                color: "red",
                user: user,
                setUser: setUser
            }}
        >
            <LoginScreen />
        </ExampleContext.Provider>
    );
};

export default App;
