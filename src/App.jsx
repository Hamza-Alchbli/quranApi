import { useState, useEffect } from "react";

function App() {
    const [surahs, setSurahs] = useState([]);
    const [currentSurah, setCurrentSurah] = useState(1);
    useEffect(() => {
        const fetchSurahs = async () => {
            try {
                const res = await fetch(
                    "http://api.alquran.cloud/v1/quran/quran-uthmani"
                );
                const data = await res.json();
                const surahData = data.data.surahs;
                setSurahs(surahData);
                // console.log(surahData);
                const result = surahs.find((item) => item.number === currentSurah);
                console.log(result);
            } catch (err) {
                console.log(err);
            }
        };

        fetchSurahs();

    }, []);

    return (
        <>
            {surahs.length > 0 ? (
                <div>
                    <button
                        onClick={() => {
                            setCurrentSurah(currentSurah + 1);
                        }}
                    >
                        Next surah
                    </button>
                </div>
            ) : (
                <p>Loading surahs...</p>
            )}
        </>
    );
}

export default App;
