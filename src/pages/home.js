import React, { useContext, useState } from "react";
import { Dimensions, TouchableWithoutFeedback, View } from "react-native";
import {
    Flex,
    NativeBaseProvider,
    Image,
    FlatList,
    Box,
    Pressable,
    Text,
    HStack,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import { AudioContext } from "../context/AudioProvider";
import Footer from "./footer";

export const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Home({ navigation }) {
    const context = useContext(AudioContext);
    const { details, selectStation, changeStation, getStations } = context;

    async function nextSong() {
        await changeStation("next", details.stationIndex);
    }
    async function prevSong() {
        await changeStation("prev", details.stationIndex);
    }

    function isEmpty(obj) {
        var i = Object.keys(obj).length !== 0;
        console.log("var", typeof i);

        return Object.keys(obj).length !== 0;
    }

    // console.log("det", details.countries."IN");

    return (
        <NativeBaseProvider>
            <View>
                <Box p="5" safeArea>
                    <Text fontSize="2xl" bold>
                        Countries Available
                    </Text>

                    <FlatList
                        data={details.countries}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <Pressable
                                onPress={() => {
                                    console.log("pressed");
                                    getStations(item[0]);
                                    if (details.radioStations) {
                                        console.log("asd");
                                        navigation.navigate("station");
                                    }
                                }}
                            >
                                <Box
                                    p="2"
                                    mb="1"
                                    maxW={windowWidth - 10}
                                    rounded="lg"
                                    flexDirection="row"
                                    overflow="hidden"
                                    borderColor="coolGray.200"
                                    borderWidth="1"
                                >
                                    <Flex
                                        my={2}
                                        flexDirection="row-reverse"
                                        align={"center"}
                                    >
                                        <Text fontSize={"xl"}>{item[1]}</Text>
                                        <Box>
                                            <Entypo
                                                name="chevron-right"
                                                size={24}
                                                color="black"
                                            />
                                        </Box>
                                    </Flex>
                                </Box>
                            </Pressable>
                        )}
                    />
                    {isEmpty(details.currentStation) && (
                        <HStack>
                            <Footer />
                        </HStack>
                    )}
                </Box>
            </View>
        </NativeBaseProvider>
    );
}
