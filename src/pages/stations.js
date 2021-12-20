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
import { Spin } from "./country";

const Stations = () => {
    const [comp, setComp] = useState("");
    const { details, selectStation } = useContext(AudioContext);

    function isEmpty(obj) {
        var i = Object.keys(obj).length !== 0;
        return i;
    }

    useEffect(() => {
        if (details.totalStationCount === 0) setComp("NO");
        if (details.totalStationCount === -1) setComp("loading");
        if (details.totalStationCount > 0) setComp("done");
    }, [details.totalStationCount]);

    const NoStation = () => {
        return (
            <Center flex={1} bg={"#fff"}>
                <Image
                    source={require("../../assets/noStation.jpg")}
                    alt="ss"
                />
                <Text color="red.600" fontSize="3xl" bold>
                    No Stations Available
                </Text>
            </Center>
        );
    };

    const List = () => {
        return (
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
        );
    };

    return (
        <NativeBaseProvider>
            <Box safeArea flex={1} bg={DARK_BG}>
                {(() => {
                    switch (comp) {
                        case "NO":
                            return <NoStation />;
                        case "loading":
                            return <Spin />;
                        case "done":
                            return <List />;
                    }
                })()}
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
