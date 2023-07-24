import PropTypes from "prop-types";
import Loader from "../components/Loader.jsx";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleRight,
    faPause,
    faPlay,
    faShuffle,
} from "@fortawesome/free-solid-svg-icons";

function PLayer({
    isPlaying,
    generateSurahAudioURL,
    currentSurah,
    audio,
    surahInfo,
    setSurahInfo,
    playSongHandler,
    reciter,
    setCurrentIndex,
    shuffle,
    setShuffle,
    generateRandomIndex,
    randomSurah,
}) {
    useEffect(() => {
        if (shuffle && randomSurah !== null) {
            // console.log(randomSurah);
        }
    }, [shuffle, randomSurah]);
    const skipHandler = async (dir) => {
        let currentIndex = currentSurah.id - 1;

        if (dir === "skip-forward") {
            if (currentSurah.id == 114) {
                currentIndex = -1;
            }

            if (shuffle) {
                generateRandomIndex();
                console.log(randomSurah);
                if (randomSurah) {
                    await generateSurahAudioURL(randomSurah, reciter);
                }
                setCurrentIndex(randomSurah + 1);
            } else {
                await generateSurahAudioURL(currentIndex + 1, reciter);
                setCurrentIndex(currentSurah.id + 1);
            }
        }

        if (dir === "skip-back") {
            if (currentIndex == 0) {
                currentIndex = 114;
            }
            await generateSurahAudioURL(currentIndex - 1, reciter);
            setCurrentIndex(currentIndex);
            if (isPlaying) audio.current.play();
            return;
        }
        if (isPlaying) audio.current.play();
    };
    const getTime = (time) => {
        return (
            Math.floor(time / 60) +
            ":" +
            ("0" + Math.floor(time % 60)).slice(-2)
        );
    };
    const dragHandler = (e) => {
        audio.current.currentTime = e.target.value;
        setSurahInfo({ ...surahInfo, currentTime: parseInt(e.target.value) });
    };
    const trackAnim = {
        transform: `translateX(${surahInfo.animationPercentage}%)`,
    };

    return (
        <div className="player">
            {audio.current ? (
                <>
                    <div className="time-control">
                        <p>{getTime(surahInfo.currentTime)}</p>
                        <div
                            style={{
                                background: `linear-gradient(to right,#87CEEB,#DAA520)`,
                            }}
                            className="track"
                        >
                            <input
                                min={0}
                                max={surahInfo.duration || 0}
                                value={surahInfo.duration || 0}
                                onChange={dragHandler}
                                type="range"
                            />
                            <div
                                style={trackAnim}
                                className="animate-track"
                            ></div>
                        </div>
                        <p>
                            {surahInfo.duration
                                ? getTime(surahInfo.duration)
                                : "00:00"}
                        </p>
                    </div>
                    <div className="play-control">
                        <FontAwesomeIcon
                            onClick={() => skipHandler("skip-back")}
                            className="skip-back"
                            size="2x"
                            icon={faAngleLeft}
                        />
                        <FontAwesomeIcon
                            onClick={playSongHandler}
                            className="play"
                            size="2x"
                            icon={isPlaying ? faPause : faPlay}
                        />
                        <FontAwesomeIcon
                            onClick={() => skipHandler("skip-forward")}
                            className="skip-forward"
                            size="2x"
                            icon={faAngleRight}
                        />
                        <FontAwesomeIcon
                            onClick={() => setShuffle(!shuffle)}
                            className={`shuffle ${!shuffle ? "off" : ""}`}
                            size="2x"
                            icon={faShuffle}
                        />
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
}

PLayer.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    playSongHandler: PropTypes.func.isRequired,
    generateSurahAudioURL: PropTypes.func.isRequired,
    currentSurah: PropTypes.shape({
        id: PropTypes.number.isRequired,
        // Add other prop types for the `currentSurah` object if needed
    }),
    audio: PropTypes.shape({
        current: PropTypes.instanceOf(Element),
    }),
    surahInfo: PropTypes.shape({
        currentTime: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired,
        animationPercentage: PropTypes.number.isRequired,
    }).isRequired,
    setSurahInfo: PropTypes.func.isRequired,
    reciter: PropTypes.string.isRequired,
    setCurrentIndex: PropTypes.func,
    shuffle: PropTypes.bool.isRequired,
    setShuffle: PropTypes.func,
    generateRandomIndex: PropTypes.func,
    randomSurah:PropTypes.number

};

export default PLayer;
