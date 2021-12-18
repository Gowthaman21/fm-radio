import React from "react";
import AudioProvider, { AudioContext } from "./src/context/AudioProvider";
import Home from "./src/pages/home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Stations from "./src/pages/stations";

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <AudioProvider>
            {/* <Home /> */}
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="home" component={Home} />
                    <Stack.Screen name="station" component={Stations} />
                </Stack.Navigator>
            </NavigationContainer>
        </AudioProvider>
    );
}
