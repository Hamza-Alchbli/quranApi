import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import AnimatedPage from "../components/AnimatedPage";


import Library from "../components/Library.jsx";
import Surah from "../components/Surah.jsx";
import PLayer from "../components/Player.jsx";
import Loader from "../components/Loader.jsx";

import useLoadingStatus from "../components/hooks/useLoadingStatus.jsx";
import { useSurahs } from "../components/hooks/useSurahs.jsx";

function AudioPlayer({ setLibraryStatus, libraryStatus }) {
    const { error, loading, setLoading, setError } = useLoadingStatus();
    const [reciter, setReciter] = useState("mishari_al_afasy");
    const [currentIndex, setCurrentIndex] = useState(1);

    const {
        surahs,
        currentSurah,
        setCurrentSurah,
        currentSurahAudio,
        setCurrentSurahAudio,
        setLang,
        lang,
    } = useSurahs({ reciter, currentIndex });
    // console.log(currentIndex);

    const [isPlaying, setIsPlaying] = useState(false);

    const audio = useRef(null);

    const [surahInfo, setSurahInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    });

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

    const generateSurahAudioURL = async (
        index,
        reciter = "mishari_al_afasy"
    ) => {
        try {
            setCurrentSurahAudio(
                `https://download.quranicaudio.com/qdc/${reciter}/murattal/${
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
        let currentIndex = currentSurah.id - 1;

        if (currentSurah.id === 114) {
            currentIndex = -1;
        }

        generateSurahAudioURL(currentIndex + 1, reciter);
    };
    const playSongHandler = () => {
        if (isPlaying) {
            audio.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audio.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <AnimatedPage>
            {loading ? (
                 <Loader />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    {currentSurah && (
                        <Surah currentSurah={currentSurah} reciter={reciter} />
                    )}
                    <PLayer
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        generateSurahAudioURL={generateSurahAudioURL}
                        currentSurah={currentSurah}
                        audio={audio}
                        surahInfo={surahInfo}
                        setSurahInfo={setSurahInfo}
                        playSongHandler={playSongHandler}
                        reciter={reciter}
                        setCurrentIndex={setCurrentIndex}
                    />
                    <Library
                        surahs={surahs}
                        libraryStatus={libraryStatus}
                        generateSurahAudioURL={generateSurahAudioURL}
                        currentSurah={currentSurah}
                        playSongHandler={playSongHandler}
                        isPlaying={isPlaying}
                        reciter={reciter}
                        setReciter={setReciter}
                        setLang={setLang}
                        lang={lang}
                        setCurrentIndex={setCurrentIndex}
                        setLibraryStatus={setLibraryStatus}
                        setCurrentSurah={setCurrentSurah}
                    ></Library>
                    <audio
                        ref={audio}
                        src={currentSurahAudio}
                        onEnded={surahEndHandler}
                        onTimeUpdate={timeUpdateHandler}
                        onLoadedMetadata={timeUpdateHandler}
                    ></audio>
                </>
            )}
        </AnimatedPage>
    );
}
AudioPlayer.propTypes = {
    libraryStatus: PropTypes.bool.isRequired,
    setLibraryStatus: PropTypes.func.isRequired,
};
export default AudioPlayer;
