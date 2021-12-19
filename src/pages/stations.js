import {
    Flex,
    NativeBaseProvider,
    Image,
    FlatList,
    Box,
    Pressable,
    Text,
    HStack,
    Center,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { AudioContext } from "../context/AudioProvider";
import { windowWidth } from "./country";
import Footer from "./footer";
import { DARK_BG, DARK_BG2, DARK_ICON } from "../theme";

const Stations = () => {
    const [loading, setLoading] = useState(true);
    const { details, selectStation } = useContext(AudioContext);

    function isEmpty(obj) {
        var i = Object.keys(obj).length !== 0;
        return i;
    }

    useEffect(() => {
        if (details.radioStations.length > 0) {
            setLoading(false);
        }
    }, [details.radioStations]);

    return (
        <NativeBaseProvider>
            <Box safeArea flex={1} bg={DARK_BG}>
                {loading ? (
                    <Center flex={1} bg={"#fff"}>
                        <Image
                            source={require("../../assets/noStation.jpg")}
                            alt="ss"
                        />
                        <Text color="red.600" fontSize="3xl" bold>
                            No Stations Available
                        </Text>
                    </Center>
                ) : (
                    <FlatList
                        data={details.radioStations}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <Pressable
                                onPress={() => {
                                    selectStation(index);
                                }}
                            >
                                <Box
                                    p="2"
                                    mx="3"
                                    mb="1"
                                    maxW={windowWidth - 10}
                                    rounded="lg"
                                    flexDirection="row"
                                    overflow="hidden"
                                    bg={DARK_BG2}
                                >
                                    <Flex
                                        my={2}
                                        flexDirection="row-reverse"
                                        align={"center"}
                                    >
                                        <Text fontSize={"xl"} color={DARK_ICON}>
                                            {item.name}
                                        </Text>
                                    </Flex>
                                </Box>
                            </Pressable>
                        )}
                    />
                )}
                {isEmpty(details.currentStation) && (
                    <HStack>
                        <Footer />
                    </HStack>
                )}
            </Box>
        </NativeBaseProvider>
    );
};

export default Stations;
