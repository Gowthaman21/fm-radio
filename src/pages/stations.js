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
import React, { useContext, useEffect, useState } from "react";
import { AudioContext } from "../context/AudioProvider";
import { Example, windowWidth } from "./country";
import Footer from "./footer";

const Stations = () => {
    const [loading, setLoading] = useState(true);
    const { details, selectStation } = useContext(AudioContext);

    function isEmpty(obj) {
        var i = Object.keys(obj).length !== 0;
        return i;
    }

    useEffect(() => {
        if (details.radioStations.length > 0) {
            setLoading(!loading);
        }
    }, [details.radioStations]);
    return (
        <NativeBaseProvider>
            {loading ? (
                <Example />
            ) : (
                <Box p="5" safeArea flex={1}>
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
            )}
        </NativeBaseProvider>
    );
};

export default Stations;
