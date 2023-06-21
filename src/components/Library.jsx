import { useState } from "react";

import PropTypes from "prop-types";

import LibrarySurah from "./LibrarySurah.jsx";

function Library({ surahs, libraryStatus, generateSurahAudioURL }) {
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
            {/* <FontAwesomeIcon icon={faSearch} /> */}
            {surahs.map((surah, index) => {
                const searchTermLower = searchTerm.toLowerCase();
                const surahNameNormalized = removeDiacritics(
                    surah.name
                ).normalize("NFD");
                if (
                    surah.englishName.toLowerCase().includes(searchTermLower) ||
                    surah.englishNameTranslation
                        .toLowerCase()
                        .includes(searchTermLower) ||
                    surahNameNormalized.includes(searchTerm.normalize("NFD"))
                ) {
                    return (
                        <LibrarySurah
                            key={surah.name}
                            generateSurahAudioURL={generateSurahAudioURL}
                            surah={surah}
                            index={index}
                        />
                    );
                }
                return null;
            })}
        </div>
    );
}

Library.propTypes = {
    surahs: PropTypes.array.isRequired,
    libraryStatus: PropTypes.bool.isRequired,
    generateSurahAudioURL: PropTypes.func.isRequired,
};
export default Library;
