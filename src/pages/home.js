import { NativeBaseProvider, Box, Center, Text, Pressable } from "native-base";
import React from "react";
import { windowWidth } from "./country";

const Home = ({ navigation }) => {
    const Example = (props) => {
        return (
            <Box
                m={3}
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                p="2"
                mb="1"
                w={windowWidth * 0.4}
                h={windowWidth * 0.4}
                justifyContent="center"
                alignItems="center"
                {...props}
            />
        );
    };

    return (
        <NativeBaseProvider>
            <Center flex={1}>
                <Box flexDirection="column">
                    <Pressable
                        onPress={() => {
                            navigation.navigate("country");
                        }}
                    >
                        <Example>
                            <Text fontSize="xl">Search by Countries</Text>
                        </Example>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("Search");
                        }}
                    >
                        <Example>
                            <Text fontSize="xl">Custom Search</Text>
                        </Example>
                    </Pressable>
                </Box>
            </Center>
        </NativeBaseProvider>
    );
};

export default Home;
