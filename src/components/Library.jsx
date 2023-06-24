import { useState } from "react";

import PropTypes from "prop-types";

import LibrarySurah from "./LibrarySurah.jsx";
import useAllLang from "./hooks/useAllLang.jsx";
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
    const allLang = useAllLang();
    // console.log(allLang);
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
        generateSurahAudioURL(currentSurah.id - 1, event.target.value);
    };

    const handleLangChange = (event) => {
        setLang(event.target.value);
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
            {allLang ? (
                <select onChange={handleLangChange}>
                    {allLang.map((lang, index) => {
                        return (
                            <option
                                key={lang.iso_code + index}
                                value={lang.iso_code}
                            >
                                {lang.name}{" "}
                                {lang.native_name == ""
                                    ? lang.native_name
                                    : `|| ${lang.native_name}`}
                            </option>
                        );
                    })}
                </select>
            ) : (
                ""
            )}
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
    setLibraryStatus:PropTypes.func.isRequired,
};
export default Library;
