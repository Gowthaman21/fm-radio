import React, { useState, useEffect, createContext } from "react";
import { Audio } from "expo-av";
export const AudioContext = createContext();
import { RadioBrowserApi } from "radio-browser-api";
import ApiGetService from "../api/api-services";

const AudioProvider = ({ children }) => {
    const [details, setDetails] = useState({
        radioStations: [],
        countries: [],
        playbackObj: null,
        soundObj: null,
        currentStation: {},
        isPlaying: false,
        stationIndex: 0,
        playbackPosition: null,
        playbackDuration: null,
        totalAudioCount: 0,
    });
    const api = new RadioBrowserApi("My Radio App");

    const handleChange = async (newState) => {
        setDetails((prevState) => ({
            ...prevState,
            ...newState,
        }));
    };

    const play = async (url) => {
        try {
            return details.playbackObj.loadAsync(
                { uri: url },
                { shouldPlay: true }
            );
        } catch (error) {
            console.log("error inside player method", error.message);
        }
    };

    const pause = async () => {
        try {
            return await details.playbackObj.setStatusAsync({
                shouldPlay: false,
            });
        } catch (error) {
            console.log("error inside pause helper method", error.message);
        }
    };

    const resume = async () => {
        try {
            return await details.playbackObj.setStatusAsync({
                shouldPlay: true,
            });
        } catch (error) {
            console.log("error inside resume helper method", error.message);
        }
    };

    const switchStation = async (uri) => {
        try {
            await details.playbackObj.stopAsync();
            await details.playbackObj.unloadAsync();
            return await play(uri);
        } catch (error) {
            console.log(
                "error inside switchStation helper method",
                error.message
            );
        }
    };

    const selectStation = async (index) => {
        try {
            let station = details.radioStations[index];
            let url = station.urlResolved;
            if (details.soundObj === null) {
                // playing for first time
                console.log("hhhh", url);
                const status = await play(url);

                await handleChange({
                    currentStation: station,
                    stationIndex: index,
                    soundObj: status,
                    isPlaying: true,
                });
                return;
            }
            if (
                //pause Audio
                details.soundObj.isLoaded &&
                details.soundObj.isPlaying &&
                details.stationIndex === index
            ) {
                const status = await pause();
                handleChange({
                    soundObj: status,
                    isPlaying: false,
                });
                return;
            }
            if (
                details.soundObj.isLoaded &&
                !details.soundObj.isPlaying &&
                details.stationIndex === index
            ) {
                const status = await resume();
                handleChange({
                    soundObj: status,
                    isPlaying: true,
                });
                return;
            }
            if (details.soundObj.isLoaded && details.stationIndex !== index) {
                const status = await switchStation(url);
                handleChange({
                    currentStation: station,
                    stationIndex: index,
                    soundObj: status,
                    isPlaying: true,
                });
                return;
            }
        } catch (error) {
            console.log("error inside select audio method.", error.message);
        }
    };

    const changeStation = async (select, index) => {
        console.log("sel", select, index);
        try {
            if (select === "next") {
                let i = index + 1;
                selectStation(i);
            }
            if (select === "prev") {
                let i = index - 1;
                selectStation(i);
            }
        } catch (error) {
            console.log("error inside change audio method.", error.message);
        }
    };

    const setCountries = (country) => {
        let temp = {};
        for (let key in country) {
            temp[key] = country[key].country;
        }
        const arrayOfObj = Object.entries(temp).map((e) => ({ [e[0]]: e[1] }));
        let final = [];
        arrayOfObj.map((item) => {
            var a = Object.entries(item);
            final.push(a[0]);
        });

        handleChange({ countries: final });
    };

    const getStations = async (code) => {
        let stations = await api.searchStations({
            countryCode: code,
            limit: 100,
        });
        handleChange({ radioStations: stations });
    };

    const sta = async (data) => {
        let stations = await api.searchStations({
            countryCode: data.countryCode,
            language: data.language,
            tag: data.genre,
            limit: 100,
        });
        if (stations.length > 0) {
            handleChange({ radioStations: stations });
            return true;
        } else {
            return false;
        }
    };

    useEffect(async () => {
        Audio.setAudioModeAsync({
            staysActiveInBackground: true,
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false,
            shouldDuckAndroid: true,
        });
        let country = await ApiGetService();
        setCountries(country);

        handleChange({
            playbackObj: new Audio.Sound(),
        });
    }, []);

    return (
        <AudioContext.Provider
            value={{
                details,
                selectStation,
                changeStation,
                pause,
                getStations,
                sta,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};

export default AudioProvider;
