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
import { DARK_BG, DARK_BG2, DARK_ICON, FOOTER_BG, FOOTER_TEXT } from "../theme";
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
                            <FormControl.Label
                                _text={{ bold: true, color: FOOTER_TEXT }}
                            >
                                Country Code
                            </FormControl.Label>
                            <Input
                                placeholder="US, IN"
                                onChangeText={(value) => {
                                    handleChange({ countryCode: value });
                                }}
                                borderWidth={"0"}
                                bg={FOOTER_BG}
                                color={FOOTER_TEXT}
                                fontSize="md"
                                fontWeight="bold"
                                placeholderTextColor="#73A5A5"
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label
                                _text={{ bold: true, color: FOOTER_TEXT }}
                            >
                                Language
                            </FormControl.Label>
                            <Input
                                placeholder="tamil"
                                onChangeText={(value) => {
                                    handleChange({ language: value });
                                }}
                                borderWidth={"0"}
                                bg={FOOTER_BG}
                                color={FOOTER_TEXT}
                                fontSize="md"
                                fontWeight="bold"
                                placeholderTextColor="#73A5A5"
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label
                                _text={{ bold: true, color: FOOTER_TEXT }}
                            >
                                Genre
                            </FormControl.Label>
                            <Input
                                placeholder="jazz"
                                onChangeText={(value) => {
                                    handleChange({ genre: value });
                                }}
                                borderWidth={"0"}
                                bg={FOOTER_BG}
                                color={FOOTER_TEXT}
                                fontSize="md"
                                fontWeight="bold"
                                placeholderTextColor="#73A5A5"
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
                            bg={FOOTER_BG}
                            _text={{
                                color: FOOTER_TEXT,
                                fontWeight: "bold",
                                fontSize: "xl",
                            }}
                            w={"40"}
                            mx="auto"
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
