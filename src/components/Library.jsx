import { useState } from "react";

import PropTypes from "prop-types";

import LibrarySurah from "./LibrarySurah.jsx";

function Library({
    surahs,
    libraryStatus,
    generateSurahAudioURL,
    currentSurah,
    playSongHandler,
    isPlaying,
    reciter,
    setReciter,
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
    const handleReciterChange = (event) => {
        setReciter(event.target.value);
        generateSurahAudioURL(currentSurah.number - 1, event.target.value);
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

            <select onChange={handleReciterChange}>
                <option value="mishari_al_afasy" disabled hidden>
                    Choose Reciter || اختيار القارئ
                </option>
                <option value="mishari_al_afasy">
                    Mishary rashid alafasy || مشاري بن راشد العفاسي
                </option>
                <option value="abdul_baset">
                    Abdul Basit Abdul Samad || عبد الباسط عبد الصمد
                </option>
                <option value="siddiq_minshawi">
                    Mohamed Siddiq El-Minshawi || محمد صديق المنشاوي
                </option>
                <option value="khalil_al_husary">
                    Mahmoud Khalil Al-Hussary || محمود خليل الحصري
                </option>
            </select>

            {surahs.map((surah, index) => {
                const searchTermLower = searchTerm.toLowerCase();
                const surahNameNormalized = removeDiacritics(
                    surah.name
                ).normalize("NFD");

                if (surah.englishName === "Al-Faatiha") {
                    surah.name = "سُورَةُ الْفَاتِحَةِ";
                }

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
                            currentSurah={currentSurah}
                            playSongHandler={playSongHandler}
                            isPlaying={isPlaying}
                            reciter={reciter}
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
};
export default Library;
