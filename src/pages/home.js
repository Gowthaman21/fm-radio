import {
    NativeBaseProvider,
    Box,
    Center,
    Pressable,
    HStack,
} from "native-base";
import React, { useContext } from "react";
import { windowWidth } from "./country";
import { AudioContext } from "../context/AudioProvider";
import { DARK_BG, DARK_BG2, FOOTER_TEXT } from "../theme";
import Footer from "./footer";

const Home = ({ navigation }) => {
    const { details } = useContext(AudioContext);
    const Example = (props) => {
        return (
            <Box
                m={3}
                rounded={"xl"}
                shadow={9}
                bg={DARK_BG2}
                overflow="hidden"
                p="2"
                mb="1"
                w={windowWidth * 0.4}
                h={windowWidth * 0.4}
                justifyContent="center"
                alignItems="center"
                _text={{
                    fontSize: "xl",
                    color: FOOTER_TEXT,
                    fontWeight: "bold",
                }}
                {...props}
            />
        );
    };

    function isEmpty(obj) {
        var i = Object.keys(obj).length !== 0;
        return i;
    }

    return (
        <NativeBaseProvider>
            <Box safeArea flex={1}>
                <Center flex={1} bg={DARK_BG}>
                    <Box flexDirection="column">
                        <Pressable
                            onPress={() => {
                                navigation.navigate("country");
                            }}
                        >
                            <Example>Search by Countries</Example>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                navigation.navigate("Search");
                            }}
                        >
                            <Example>Custom Search</Example>
                        </Pressable>
                    </Box>
                </Center>
                {isEmpty(details.currentStation) && (
                    <HStack>
                        <Footer />
                    </HStack>
                )}
            </Box>
        </NativeBaseProvider>
    );
};

export default Home;
