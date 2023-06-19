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
    playingSurah,
    totalSeconds,
    elapsedSeconds,
    audioContext,
    generateSurahAudioURL,
    currentSurah,
}) {
    const [sourceNode, setSourceNode] = useState(null);
    const [startTime, setStartTime] = useState(0);
    const [pausedTime, setPausedTime] = useState(0);

    const playSongHandler = () => {
        if (isPlaying) {
            sourceNode.stop();
            setPausedTime(audioContext.currentTime - startTime);
            setIsPlaying(false);
        } else {
            const newSourceNode = audioContext.createBufferSource();
            newSourceNode.buffer = playingSurah;
            newSourceNode.connect(audioContext.destination);

            // If there is a paused time, resume from the paused time
            if (pausedTime !== 0) {
                setStartTime(audioContext.currentTime - pausedTime);
                newSourceNode.start(0, pausedTime);
            } else {
                setStartTime(audioContext.currentTime);
                newSourceNode.start();
            }

            setSourceNode(newSourceNode);
            setIsPlaying(true);
        }
    };

    const skipHandler = async (dir) => {
        switch (dir) {
            case "skip-back":
                console.log(currentSurah.number);
                await generateSurahAudioURL(currentSurah.number - 1);
                break;
            case "skip-forward":
                await generateSurahAudioURL(currentSurah.number - 1);
                break;
            default:
                console.log("nothing todo");
        }
    };
    return (
        <div className="player">
            <div className="time-control">
                <p>{elapsedSeconds}</p>
                <div
                    style={{
                        background: `linear-gradient(to right,#2ecc71,#053318)`,
                    }}
                    className="track"
                >
                    <input
                        min={0}
                        max={totalSeconds}
                        value={elapsedSeconds}
                        //  onChange={dragHandler}
                        onChange={() => {
                            console.log("ss");
                        }}
                        type="range"
                    />
                    {/* <div  style={trackAnim} className="animate-track"></div> */}
                </div>
                <p>{totalSeconds}</p>
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
        </div>
    );
}

export default PLayer;
