import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Stations from "./src/pages/stations";
import Country from "./src/pages/country";
import Home from "./src/pages/home";
import CustomSearch from "./src/pages/custSearch";
import { DARK_BG, FOOTER_TEXT } from "./src/theme";

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: DARK_BG,
                    },
                    headerTintColor: FOOTER_TEXT,
                }}
            >
                <Stack.Screen
                    name="home"
                    component={Home}
                    options={{
                        title: "Home",
                    }}
                />
                <Stack.Screen
                    name="Search"
                    component={CustomSearch}
                    options={{
                        title: "Search",
                        headerStyle: {
                            backgroundColor: DARK_BG,
                            border: "none",
                        },
                        headerTintColor: FOOTER_TEXT,
                    }}
                />
                <Stack.Screen
                    name="country"
                    component={Country}
                    options={{
                        title: "Countries Available",
                    }}
                />
                <Stack.Screen
                    name="station"
                    component={Stations}
                    options={{
                        title: "Stations Available",
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
