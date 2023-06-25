import { useState } from "react";

import PropTypes from "prop-types";

import LibrarySurah from "./LibrarySurah.jsx";
import LibOptions from "./LibOptions.jsx";

function Library({
    surahs,
    libraryStatus,
    generateSurahAudioURL,
    currentSurah,
    playSongHandler,
    isPlaying,
    reciter,
    setReciter,
    setLang,
    setCurrentIndex,
    setLibraryStatus,
}) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        setSearchTerm(removeDiacritics(event.target.value));
    };

    const removeDiacritics = (text) => {
        return text.replace(
            /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u08D4-\u08E1\u08D4-\u08ED\u08F0-\u08FF]/g,
            ""
        );
    };

    return (
        <div className={`library ${libraryStatus ? "active-library" : ""}`}>
            <h2>Quran Library</h2>

            <input
                type="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
            />

            <LibOptions
                setReciter={setReciter}
                setLang={setLang}
                currentSurah={currentSurah}
                generateSurahAudioURL={generateSurahAudioURL}
            />

            {surahs.map((surah, index) => {
                const searchTermLower = searchTerm.toLowerCase();
                const surahNameNormalized = removeDiacritics(
                    surah.name_arabic
                ).normalize("NFD");

                if (
                    surah.name_simple.toLowerCase().includes(searchTermLower) ||
                    surah.translated_name.name
                        .toLowerCase()
                        .includes(searchTermLower) ||
                    surahNameNormalized.includes(searchTerm.normalize("NFD"))
                ) {
                    return (
                        <LibrarySurah
                            key={surah.name_simple}
                            generateSurahAudioURL={generateSurahAudioURL}
                            surah={surah}
                            index={index}
                            currentSurah={currentSurah}
                            playSongHandler={playSongHandler}
                            isPlaying={isPlaying}
                            reciter={reciter}
                            setCurrentIndex={setCurrentIndex}
                            libraryStatus={libraryStatus}
                            setLibraryStatus={setLibraryStatus}
                        />
                    );
                }
                return null;
            })}
        </div>
    );
}

Library.defaultProps = {
    currentSurah: {}, // Provide a default value (empty object in this case)
};

Library.propTypes = {
    surahs: PropTypes.array.isRequired,
    libraryStatus: PropTypes.bool.isRequired,
    generateSurahAudioURL: PropTypes.func.isRequired,
    currentSurah: PropTypes.object.isRequired,
    playSongHandler: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    reciter: PropTypes.string.isRequired,
    setReciter: PropTypes.func.isRequired,
    setLang: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    setCurrentIndex: PropTypes.func.isRequired,
    setLibraryStatus: PropTypes.func.isRequired,
};

export default Library;
