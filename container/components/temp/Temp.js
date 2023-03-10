import React, { useState } from "react";
import ChildComponent from "./Context";

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
            <ChildComponent />
        </ExampleContext.Provider>
    );
};

export default App;
