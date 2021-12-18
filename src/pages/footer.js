import React, { useState, useEffect, useContext } from "react";
import { Image, Box, NativeBaseProvider } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { TouchableWithoutFeedback, Dimensions, Text } from "react-native";
import { AudioContext } from "../context/AudioProvider";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Footer() {
    const context = useContext(AudioContext);

    const { details, selectStation, changeStation, getStations } = context;

    async function nextSong() {
        await changeStation("next", details.stationIndex);
    }
    async function prevSong() {
        await changeStation("prev", details.stationIndex);
    }

    useEffect(() => {}, [details.currentStation]);

    return (
        <NativeBaseProvider>
            <Box w="full" alignItems="center" flexDirection="row" safeArea>
                <Box w={windowWidth / 2.2}>
                    <Text>{details.currentStation?.name}</Text>
                </Box>
                <TouchableWithoutFeedback onPress={prevSong}>
                    <Entypo
                        name="controller-jump-to-start"
                        size={42}
                        color="black"
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={() => {
                        selectAudio(details.stationIndex);
                    }}
                >
                    {details.isPlaying ? (
                        <Entypo
                            name="controller-paus"
                            size={42}
                            color="black"
                        />
                    ) : (
                        <Entypo
                            name="controller-play"
                            size={42}
                            color="black"
                        />
                    )}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={nextSong}>
                    <Entypo name="controller-next" size={42} color="black" />
                </TouchableWithoutFeedback>
            </Box>
        </NativeBaseProvider>
    );
}
