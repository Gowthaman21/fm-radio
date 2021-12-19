import React from "react";
import AudioProvider from "./src/context/AudioProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "./routes";

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <AudioProvider>
            <Routes />
        </AudioProvider>
    );
}
