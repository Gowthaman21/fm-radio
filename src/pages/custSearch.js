import {
    FormControl,
    Input,
    NativeBaseProvider,
    VStack,
    Center,
    Button,
    Box,
    HStack,
} from "native-base";
import React, { useState, useContext } from "react";
import { AudioContext } from "../context/AudioProvider";
import { DARK_BG, DARK_BG2, DARK_ICON } from "../theme";
import Footer from "./footer";

const CustomSearch = ({ navigation }) => {
    const [search, setSearch] = useState({
        countryCode: "",
        language: "",
        genre: "",
    });
    const { filterStations, details } = useContext(AudioContext);
    const handleChange = async (newState) => {
        setSearch((prevState) => ({
            ...prevState,
            ...newState,
        }));
    };
    function isEmpty(obj) {
        var i = Object.keys(obj).length !== 0;
        return i;
    }
    return (
        <NativeBaseProvider>
            <Box safeArea flex={1} bg={DARK_BG}>
                <Center flex={1}>
                    <VStack width="90%" mx="3">
                        <FormControl>
                            <FormControl.Label _text={{ bold: true }}>
                                Country Code
                            </FormControl.Label>
                            <Input
                                placeholder="US, IN"
                                onChangeText={(value) => {
                                    handleChange({ countryCode: value });
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label _text={{ bold: true }}>
                                Language
                            </FormControl.Label>
                            <Input
                                placeholder="tamil"
                                onChangeText={(value) => {
                                    handleChange({ language: value });
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label _text={{ bold: true }}>
                                Genre
                            </FormControl.Label>
                            <Input
                                placeholder="jazz"
                                onChangeText={(value) => {
                                    handleChange({ genre: value });
                                }}
                            />
                        </FormControl>
                        <Button
                            onPress={async () => {
                                let d = await filterStations(search);
                                if (d) {
                                    navigation.navigate("station");
                                }
                            }}
                            mt="5"
                            colorScheme="cyan"
                        >
                            Submit
                        </Button>
                    </VStack>
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

export default CustomSearch;
