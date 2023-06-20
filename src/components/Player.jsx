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
    return (
        <div className="player">
            {audio.current ? (
                <>
                    <div className="time-control">
                        <p>{getTime(audio.current.currentTime)}</p>
                        <div
                            style={{
                                background: `linear-gradient(to right,#2ecc71,#053318)`,
                            }}
                            className="track"
                        >
                            <input
                                min={0}
                                max={audio.current.duration || 0}
                                value={0}
                                //  onChange={dragHandler}
                                onChange={() => {
                                    console.log("ss");
                                }}
                                type="range"
                            />
                            {/* <div  style={trackAnim} className="animate-track"></div> */}
                        </div>
                        <p>{getTime(audio.current.duration)}</p>
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
