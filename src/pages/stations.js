import {
    Flex,
    NativeBaseProvider,
    Image,
    FlatList,
    Box,
    Pressable,
    Text,
    View,
    HStack,
} from "native-base";
import React, { useContext } from "react";
import { AudioContext } from "../context/AudioProvider";
import { windowWidth } from "./home";
import { Entypo } from "@expo/vector-icons";
import Footer from "./footer";

const Stations = () => {
    const context = useContext(AudioContext);
    const { details, selectStation, changeStation, getStations } = context;

    function isEmpty(obj) {
        var i = Object.keys(obj).length !== 0;
        console.log("var", typeof i);

        return Object.keys(obj).length !== 0;
    }
    return (
        <NativeBaseProvider>
            <View>
                <Box p="5" safeArea>
                    <Text fontSize="2xl" bold>
                        Stations Available
                    </Text>
                    <FlatList
                        data={details.radioStations}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <Pressable
                                onPress={() => {
                                    console.log("pressed", item);
                                    // let i = details.radioStations.findIndex(
                                    //     (x) => x.id === item.id
                                    // );
                                    // console.log("ii", i);

                                    selectStation(index);
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
                                        <Text fontSize={"xl"}>{item.name}</Text>

                                        {/* <Image
                                            key={Date.now()}
                                            source={{
                                                uri: item.favicon,
                                            }}
                                            alt="Alternate Text"
                                            size="30"
                                        /> */}
                                    </Flex>
                                    {/* <Text fontSize="xs">{item}</Text> */}
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
};

export default Stations;
