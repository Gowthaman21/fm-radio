import React, { useEffect, useContext } from "react";
import { Box, NativeBaseProvider } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { TouchableWithoutFeedback, Dimensions } from "react-native";
import { AudioContext } from "../context/AudioProvider";
import { FOOTER_BG, FOOTER_TEXT } from "../theme";
import MarqueeText from "react-native-marquee";

export default function Footer() {
    const windowWidth = Dimensions.get("window").width;
    function Text(props) {
        return (
            <MarqueeText
                duration={5000}
                marqueeOnStart
                loop
                marqueeDelay={1000}
                marqueeResetDelay={3000}
                {...props}
            />
        );
    }

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
            <Box
                bg={FOOTER_BG}
                w="full"
                alignItems="center"
                flexDirection="row"
                safeArea
                h="60px"
                px="2"
            >
                <Box w={windowWidth / 1.6} px={"4"}>
                    <Text
                        style={{
                            fontSize: 22,
                            fontWeight: "bold",
                            color: FOOTER_TEXT,
                        }}
                    >
                        {details.currentStation?.name}
                    </Text>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "bold",
                            color: FOOTER_TEXT,
                        }}
                    >
                        {details.currentStation.language}
                    </Text>
                </Box>
                <TouchableWithoutFeedback onPress={prevSong}>
                    <Entypo
                        name="controller-jump-to-start"
                        size={42}
                        color={FOOTER_TEXT}
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={() => {
                        selectStation(details.stationIndex);
                    }}
                >
                    {details.isPlaying ? (
                        <Entypo
                            name="controller-paus"
                            size={42}
                            color={FOOTER_TEXT}
                        />
                    ) : (
                        <Entypo
                            name="controller-play"
                            size={42}
                            color={FOOTER_TEXT}
                        />
                    )}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={nextSong}>
                    <Entypo
                        name="controller-next"
                        size={42}
                        color={FOOTER_TEXT}
                    />
                </TouchableWithoutFeedback>
            </Box>
        </NativeBaseProvider>
    );
}
