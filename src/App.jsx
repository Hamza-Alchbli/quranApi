import { useState, useEffect, useRef } from "react";

function App() {
    const [surahs, setSurahs] = useState([]);
    const [currentSurah, setCurrentSurah] = useState("");
    const audioRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [currentSurahAyahs, setCurrentSurahAyahs] = useState([]);

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
    }, []);

    const generateSurahAudioURL = async (index) => {
        try {
          const response = await fetch(
            `https://api.alquran.cloud/v1/surah/${index + 1}/ar.alafasy`
          );
          const { data } = await response.json();
          const surahData = data.ayahs;
          const audioUrls = surahData.map((ayah) => ayah.audio);
      
          const audioContext = new AudioContext();
          const audioBufferPromises = audioUrls.map((url) => {
            return fetch(url)
              .then((response) => response.arrayBuffer())
              .then((arrayBuffer) =>
                audioContext.decodeAudioData(arrayBuffer)
              );
          });
      
          const startTime = performance.now();
      
          const audioBuffers = await Promise.all(audioBufferPromises);
          const totalDuration = audioBuffers.reduce(
            (sum, buffer) => sum + buffer.duration,
            0
          );
      
          const endTime = performance.now();
          const calculationTime = endTime - startTime;
      
          console.log("Total time (in seconds):", totalDuration);
          console.log("Calculation time (in milliseconds):", calculationTime);
          setLoading(false);
        } catch (err) {
          console.log(err);
          setError("Failed to fetch surah audio. Please try again later.");
          setLoading(false);
        }
      };
      
      

    const playSurahAudio = () => {
        if (audioRef.current) {
            if (audioRef.current.duration === Infinity) {
                audioRef.current.addEventListener("loadedmetadata", () => {
                    audioRef.current.play();
                    setTotalSeconds(Math.floor(audioRef.current.duration));
                });
            } else {
                audioRef.current.play();
                setTotalSeconds(Math.floor(audioRef.current.duration));
            }
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const currentTime = Math.floor(audioRef.current.currentTime);
            setElapsedSeconds(currentTime);
        }
    };

    return (
        <>
            {loading ? (
                <p>Loading surahs...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {surahs.map((surah, index) => {
                        return (
                            <div key={surah.name}>
                                <p>{surah.name}</p>
                                <p>{surah.englishName}</p>
                                <p>{surah.englishNameTranslation}</p>
                                <button
                                    onClick={() => {
                                        generateSurahAudioURL(index);
                                        // setCurrentSurah(surah.name);
                                    }}
                                >
                                    Play Surah
                                </button>
                                <p></p>
                            </div>
                        );
                    })}
                    <p>Elapsed Time: {elapsedSeconds} seconds</p>
                    <p>Total Duration: {totalSeconds} seconds</p>
                </div>
            )}

            {currentSurahAyahs.length > 0 && (
                <>
                    {currentSurahAyahs.map((ayah) => (
                        <div key={ayah.number}>
                            <p>{ayah.text}</p>
                            <audio src={ayah.audio} controls />
                        </div>
                    ))}
                </>
            )}

            {currentSurah && (
                <audio
                    ref={audioRef}
                    src={currentSurahAyahs[0].audio}
                    onCanPlayThrough={playSurahAudio}
                    onTimeUpdate={handleTimeUpdate}
                />
            )}
        </>
    );
}

export default App;
