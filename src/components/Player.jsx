import PropTypes from "prop-types";
import Loader from "../components/Loader.jsx";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleRight,
    faPause,
    faPlay,
    faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import { Timer } from "lucide-react";

function PLayer({
    isPlaying,
    setIsPlaying,
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
    const [timer, setTimer] = useState(false);
    const timerEl = useRef(null);
    const [timerValue, setTimerValue] = useState(0);

    useEffect(() => {
        if (shuffle && randomSurah !== null) {
            if (randomSurah) {
                generateSurahAudioURL(randomSurah, reciter);
            }
            setCurrentIndex(randomSurah + 1);
        }
    }, [randomSurah]);

    useEffect(() => {
        if (timerValue > 0 && timer) {
            const timerInterval = setInterval(() => {
                if (!timer) return;
                audio.current.pause();
                setIsPlaying(false);
            }, timerValue * 60000);
            return () => clearInterval(timerInterval);
        }
    }, [timerValue, timer]);

    const updateTimerHandler = () => {
        setTimerValue(timerEl.current.value);
    };
    const skipHandler = async (dir) => {
        let currentIndex = currentSurah.id - 1;

        if (dir === "skip-forward") {
            if (currentSurah.id == 114) {
                currentIndex = -1;
            }

            if (shuffle) {
                generateRandomIndex();
                // console.log(randomSurah);
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
                    </div>
                    <div className="options-control">
                        <div className="icons">
                            <FontAwesomeIcon
                                onClick={() => setShuffle(!shuffle)}
                                className={`shuffle ${!shuffle ? "off" : ""}`}
                                size="2x"
                                icon={faShuffle}
                            />
                            <Timer
                                size={32}
                                onClick={() => {
                                    setTimer(!timer);
                                    setTimerValue(0);
                                }}
                                className={`timer-icon ${!timer ? "off" : ""}`}
                            />
                        </div>
                        <div className={`active-timer ${!timer ? "off" : ""}`}>
                            <p>Sleep timer:</p>
                            <select
                                name="timer"
                                id="timer"
                                ref={timerEl}
                                onChange={(e) => updateTimerHandler(e)}
                            >
                                <option value="0">Off</option>
                                <option value="1">1 min</option>
                                <option value="3">3 min</option>
                                <option value="5">5 min</option>
                                <option value="10">10 min</option>
                                <option value="15">15 min</option>
                                <option value="30">30 min</option>
                                <option value="45">45 min</option>
                                <option value="60">1 hour</option>
                                <option value="90">1.5 hour</option>
                                <option value="120">2 hours</option>
                            </select>
                        </div>
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
    setIsPlaying: PropTypes.func,
    generateRandomIndex: PropTypes.func,
    randomSurah: PropTypes.number,
};

export default PLayer;
