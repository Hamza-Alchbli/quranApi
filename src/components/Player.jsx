import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleRight,
    faPause,
    faPlay,
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

function PLayer({
    isPlaying,
    setIsPlaying,
    generateSurahAudioURL,
    currentSurah,
    audio,
    surahInfo,
    setSurahInfo,
}) {
    const playSongHandler = () => {
        if (isPlaying) {
            audio.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audio.current.play();
            setIsPlaying(!isPlaying);
        }
    };
    const skipHandler = async (dir) => {
        let currentIndex = currentSurah.number - 1;

        if (dir === "skip-forward") {
            if (currentSurah.number == 114) {
                currentIndex = -1;
            }
            await generateSurahAudioURL(currentIndex + 1);
        }
        if (dir === "skip-back") {
            if (currentIndex == 0) {
                currentIndex = 114;
            }
            await generateSurahAudioURL(currentIndex - 1);
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
        setSurahInfo({ ...surahInfo, currentTime: e.target.value });
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
                                background: `linear-gradient(to right,#2ecc71,#053318)`,
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
                        <p>{getTime(surahInfo.duration)}</p>
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
                </>
            ) : (
                <p>Loading..</p>
            )}
        </div>
    );
}

export default PLayer;
