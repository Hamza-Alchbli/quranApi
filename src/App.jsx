import { useState, useEffect, useRef } from "react";

import Nav from "./components/Nav";
import Library from "./components/library";
import Surah from "./components/Surah";
import PLayer from "./components/Player";

function App() {
    // error and loading states
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    // library and isPlaying states
    const [libraryStatus, setLibraryStatus] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    // data states (surahs contains the text data and SurahsAudio contains audio data)
    const [surahs, setSurahs] = useState([]);
    const [surahsAudio, setSurahsAudio] = useState([]);

    const [currentSurah, setCurrentSurah] = useState();
    const [currentSurahAudio, setCurrentSurahAudio] = useState(1);
    const [currentTime, setCurrentTime] = useState();

    const [totalSeconds, setTotalSeconds] = useState(0);
    const audio = useRef(null);

    const [firstLoaded, setFirstLoaded] = useState(true);

    useEffect(() => {
        const fetchSurahs = async () => {
            try {
                const response = await fetch(
                    "https://api.alquran.cloud/v1/quran/en.asad"
                );
                const { data } = await response.json();
                const surahData = data.surahs;
                setSurahs(surahData);
                setCurrentSurah(surahData[1]);
                setCurrentSurahAudio(
                    "https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/2.mp3"
                );
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError("Failed to fetch surahs. Please try again later.");
                setLoading(false);
            }
        };
        const fetchSurahsAudio = async () => {
            try {
                let data = [];
                for (let i = 1; i < 114; i++) {
                    data.push(
                        `https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/${i}.mp3`
                    );
                }
                setSurahsAudio(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError("Failed to fetch surahs. Please try again later.");
                setLoading(false);
            }
        };
        fetchSurahs();
        fetchSurahsAudio();
    }, []);
    useEffect(() => {
        if (currentSurahAudio) {
            const playAudio = async () => {
                try {
                    if (isPlaying === true) {
                        await audio.current.play();
                        setIsPlaying(true);
                    }
                } catch (err) {
                    console.log(err);
                }
            };

            playAudio();
        }
    }, [currentSurahAudio, audio, isPlaying]);

    const generateSurahAudioURL = async (index) => {
        try {
            setCurrentSurahAudio(
                `https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/${
                    index + 1
                }.mp3`
            );
            setCurrentSurah(surahs[index]);
        } catch (err) {
            console.log(err);
            setError("Failed to fetch surah audio. Please try again later.");
            setLoading(false);
        }
    };

    const updateCurrentTime = () => {
        if (audio.current && !audio.current.seeking) {
            const currentTime = parseInt(audio.current.currentTime);
            setCurrentTime(currentTime);
        }
    };

    const surahEndHandler = () => {
        let currentIndex = currentSurah.number - 1;

        if (currentSurah.number === 114) {
            currentIndex = -1;
        }

        generateSurahAudioURL(currentIndex + 1);
    };

    const songLoadHandler = () => {
        if (firstLoaded) {
            setFirstLoaded(false);
        } else {
            if (isPlaying) {
                audio.current.play();
            }
        }
    };
    return (
        <div>
            {loading ? (
                <p>Loading surahs...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className={`App ${libraryStatus ? "library-active" : ""}`}>
                    <Nav
                        libraryStatus={libraryStatus}
                        setLibraryStatus={setLibraryStatus}
                    />
                    {currentSurah && <Surah currentSurah={currentSurah} />}
                    <PLayer
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        generateSurahAudioURL={generateSurahAudioURL}
                        totalSeconds={totalSeconds}
                        currentSurah={currentSurah}
                        audio={audio}
                    />
                    <Library
                        surahs={surahs}
                        libraryStatus={libraryStatus}
                        generateSurahAudioURL={generateSurahAudioURL}
                    ></Library>
                    <audio
                        onLoadedData={songLoadHandler}
                        ref={audio}
                        src={currentSurahAudio}
                        onTimeUpdate={updateCurrentTime}
                        onEnded={surahEndHandler}
                        controls
                    ></audio>
                </div>
            )}
        </div>
    );
}

export default App;
