import { useState, useEffect } from "react";
// import {
//     faPlay,
//     faAngleLeft,
//     faAngleRight,
//     faPause,
// } from "@fortawesome/free-solid-svg-icons";

import Nav from "./components/Nav";
import Library from "./components/library";
import Surah from "./components/Surah";
import PLayer from "./components/Player";

function App() {
    const [surahs, setSurahs] = useState([]);
    const [currentSurah, setCurrentSurah] = useState("Al-Faatiha");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [reciter, setReciter] = useState("Alafasy");
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContext = new AudioContext();
    let sourceNode = null; // Keep track of the current audio source

    const [libraryStatus, setLibraryStatus] = useState(false);

    useEffect(() => {
        const fetchSurahs = async () => {
            try {
                const response = await fetch(
                    "https://api.alquran.cloud/v1/quran/en.asad"
                );
                const { data } = await response.json();
                const surahData = data.surahs;
                setSurahs(surahData);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError("Failed to fetch surahs. Please try again later.");
                setLoading(false);
            }
        };

        fetchSurahs();
        generateSurahAudioURL(0);
    }, []);

    const generateSurahAudioURL = async (index) => {
        try {
            const response = await fetch(
                `https://api.alquran.cloud/v1/surah/${index + 1}/ar.alafasy`
            );
            const { data } = await response.json();
            const surahData = data;

            const audioUrls = surahData.ayahs.map((ayah) => ayah.audio);

            const audioBufferPromises = audioUrls.map((url) => {
                return fetch(url)
                    .then((response) => response.arrayBuffer())
                    .then((arrayBuffer) =>
                        audioContext.decodeAudioData(arrayBuffer)
                    );
            });

            const audioBuffers = await Promise.all(audioBufferPromises);

            const mergedBuffer = mergeAudioBuffers(audioBuffers);

            if (sourceNode !== null) {
                // sourceNode.stop();
                sourceNode.disconnect();
            }
            sourceNode = audioContext.createBufferSource();
            sourceNode.buffer = mergedBuffer;

            sourceNode.connect(audioContext.destination);
            // sourceNode.start();

            setLoading(false);

            let totalDuration = audioBuffers.reduce(
                (sum, buffer) => sum + buffer.duration,
                0
            );

            // const startTime = performance.now();
            // const endTime = performance.now();
            // const calculationTime = endTime - startTime;

            const hours = Math.floor(totalDuration / 3600);
            const minutes = Math.floor((totalDuration % 3600) / 60);
            const seconds = Math.floor(totalDuration % 60);

            const formattedDuration = `${hours
                .toString()
                .padStart(1, "0")}:${minutes
                .toString()
                .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
                
            setTotalSeconds(formattedDuration);
            setCurrentSurah(data.englishName);
            setReciter(data.edition.englishName);

            // Start updating elapsed time continuously
            requestAnimationFrame(updateElapsedTime);

            // console.log("Total time (in seconds):", totalDuration);
            // console.log("Calculation time (in milliseconds):", calculationTime);

            console.log(data);
        } catch (err) {
            console.log(err);
            setError("Failed to fetch surah audio. Please try again later.");
            setLoading(false);
        }
    };

    const mergeAudioBuffers = (audioBuffers) => {
        const numberOfChannels = audioBuffers[0].numberOfChannels;
        const mergedBufferLength = audioBuffers.reduce(
            (length, buffer) => length + buffer.length,
            0
        );
        const sampleRate = audioBuffers[0].sampleRate;
        const mergedBuffer = audioContext.createBuffer(
            numberOfChannels,
            mergedBufferLength,
            sampleRate
        );

        for (let channel = 0; channel < numberOfChannels; channel++) {
            const channelData = mergedBuffer.getChannelData(channel);
            let offset = 0;
            for (const buffer of audioBuffers) {
                const bufferData = buffer.getChannelData(channel);
                channelData.set(bufferData, offset);
                offset += bufferData.length;
            }
        }

        return mergedBuffer;
    };

    const updateElapsedTime = () => {
        if (sourceNode && sourceNode.context.state === "running") {
            setElapsedSeconds(Math.floor(sourceNode.context.currentTime));
        }
        requestAnimationFrame(updateElapsedTime);
    };
    return (
        <div>
            {loading ? (
                <p>Loading surahs...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className={`App ${libraryStatus ? "library-active" : ""}`}>
                    {/* <p>Elapsed Time: {elapsedSeconds} seconds</p>
                    <p>Total Duration: {totalSeconds}</p> */}
                    {/* <p>{currentSurah}</p>
                    <p>{reciter}</p> */}
                    <Nav
                        libraryStatus={libraryStatus}
                        setLibraryStatus={setLibraryStatus}
                    />
                    <Surah currentSurah={currentSurah} reciter={reciter} />
                    <PLayer
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        generateSurahAudioURL={generateSurahAudioURL}
                    />
                    <Library
                        surahs={surahs}
                        libraryStatus={libraryStatus}
                        generateSurahAudioURL={generateSurahAudioURL}
                    ></Library>
                </div>
            )}
        </div>
    );
}

export default App;
