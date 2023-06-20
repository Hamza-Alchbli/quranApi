import { useState, useEffect, useRef } from "react";

import Nav from "./components/Nav.jsx";
import Library from "./components/Library.jsx";
import Surah from "./components/Surah.jsx";
import PLayer from "./components/Player.jsx";

function App() {
    // error and loading states
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    // library and isPlaying states
    const [libraryStatus, setLibraryStatus] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    // data states (surahs contains the text data and SurahsAudio contains audio data)
    const [surahs, setSurahs] = useState([]);
    // curent surah data and audio
    const audio = useRef(null);
    const [currentSurah, setCurrentSurah] = useState();
    const [currentSurahAudio, setCurrentSurahAudio] = useState(1);
    const [surahInfo, setSurahInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    });

    useEffect(() => {
        const fetchSurahs = async () => {
            try {
                const response = await fetch(
                    "https://api.alquran.cloud/v1/quran/en.asad"
                );
                const { data } = await response.json();
                const surahData = data.surahs;
                setSurahs(surahData);
                setCurrentSurah(surahData[0]);
                setCurrentSurahAudio(
                    "https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/1.mp3"
                );
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError("Failed to fetch surahs. Please try again later.");
                setLoading(false);
            }
        };

        fetchSurahs();
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

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        //Calculate percentage
        const roundedCurrent = Math.round(current);
        const roundedDuration = Math.round(duration);
        const animation = Math.round((roundedCurrent / roundedDuration) * 100);

        setSurahInfo({
            ...surahInfo,
            currentTime: current,
            duration,
            animationPercentage: animation,
        });
    };

    const surahEndHandler = () => {
        let currentIndex = currentSurah.number - 1;

        if (currentSurah.number === 114) {
            currentIndex = -1;
        }

        generateSurahAudioURL(currentIndex + 1);
    };

    return (
        <div>
            {loading ? (
                <p>Loading website...</p>
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
                        currentSurah={currentSurah}
                        audio={audio}
                        surahInfo={surahInfo}
                        setSurahInfo={setSurahInfo}
                    />
                    <Library
                        surahs={surahs}
                        libraryStatus={libraryStatus}
                        generateSurahAudioURL={generateSurahAudioURL}
                    ></Library>
                    <audio
                        ref={audio}
                        src={currentSurahAudio}
                        onEnded={surahEndHandler}
                        onTimeUpdate={timeUpdateHandler}
                        onLoadedMetadata={timeUpdateHandler}
                    ></audio>
                </div>
            )}
        </div>
    );
}

export default App;
