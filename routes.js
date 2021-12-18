import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Stations from "./src/pages/stations";
import Country from "./src/pages/country";
import Home from "./src/pages/home";
import CustomSearch from "./src/pages/custSearch";

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="home"
                    component={Home}
                    options={{ title: "Home" }}
                />
                <Stack.Screen
                    name="Search"
                    component={CustomSearch}
                    options={{ title: "Search" }}
                />
                <Stack.Screen
                    name="country"
                    component={Country}
                    options={{ title: "Countries Available" }}
                />
                <Stack.Screen
                    name="station"
                    component={Stations}
                    options={{ title: "Stations Available" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
