import {
    FormControl,
    Input,
    NativeBaseProvider,
    VStack,
    Center,
    Button,
} from "native-base";
import React, { useState, useContext } from "react";
import { AudioContext } from "../context/AudioProvider";

const CustomSearch = ({ navigation }) => {
    const [search, setSearch] = useState({
        countryCode: "",
        language: "",
        genre: "",
    });
    const { sta } = useContext(AudioContext);
    const handleChange = async (newState) => {
        setSearch((prevState) => ({
            ...prevState,
            ...newState,
        }));
    };
    return (
        <NativeBaseProvider>
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
                            let d = await sta(search);
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
        </NativeBaseProvider>
    );
};

export default CustomSearch;
