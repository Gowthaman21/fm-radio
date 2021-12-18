import React, { useContext, useState, useEffect } from "react";
import { Dimensions} from "react-native";
import {
    Flex,
    NativeBaseProvider,
    Image,
    FlatList,
    Box,
    Pressable,
    Text,
    Spinner,
    HStack,
    Heading,
    Center,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import { AudioContext } from "../context/AudioProvider";
import Footer from "./footer";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

export const Example = () => {
    return (
        <Center flex={1} px="3">
            <HStack space={2} alignItems="center">
                <Spinner accessibilityLabel="Loading posts" />
                <Heading color="primary.500" fontSize="md">
                    Loading
                </Heading>
            </HStack>
        </Center>
    );
};
export default function Country({ navigation }) {
    const [loading, setLoading] = useState(true);
    const context = useContext(AudioContext);
    const { details, getStations } = context;

    function isEmpty(obj) {
        var i = Object.keys(obj).length !== 0;
        return i;
    }
    useEffect(() => {
        if (details.countries.length > 0) {
            setLoading(!loading);
        }
    }, [details.countries]);

    return (
        <NativeBaseProvider>
            {loading ? (
                <Example />
            ) : (
                <Box p="5" safeArea flex={1}>
                    <FlatList
                        data={details.countries}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <Pressable
                                onPress={() => {
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
            )}
        </NativeBaseProvider>
    );
}
