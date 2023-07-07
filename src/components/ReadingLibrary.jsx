import PropTypes from "prop-types";

import { useState } from "react";
import { useSurahs } from "../components/hooks/useSurahs";
import ReadingSurah from "./ReadingSurah";
import LibOptions from "./LibOptions";
const ReadingLibrary = ({
    libraryStatus,
    setLibraryStatus,
    reciter,
    setReciter,
    currentIndex,
    setCurrentIndex,
}) => {

    const { surahs, currentSurah, setLang, lang } = useSurahs({
        reciter,
        currentIndex,
    });

    const [searchTerm, setSearchTerm] = useState("");
    const removeDiacritics = (text) => {
        return text.replace(
            /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u08D4-\u08E1\u08D4-\u08ED\u08F0-\u08FF]/g,
            ""
        );
    };
    const handleSearch = (event) => {
        setSearchTerm(removeDiacritics(event.target.value));
    };

    return (
        <div className={`library ${libraryStatus ? "active-library" : ""}`}>
            <h2>Quran Library</h2>
            <input
                id="search"
                type="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <LibOptions {...{ setReciter, setLang, currentSurah }} />
            {/* {console.log(currentSurah)} */}
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
                        <ReadingSurah
                            key={`${index}=${surah.name_simple}`}
                            {...{
                                surah,
                                index,
                                currentSurah,
                                libraryStatus,
                                setLibraryStatus,
                                setCurrentIndex,
                                lang,
                            }}
                        />
                    );
                }
                return null;
            })}
        </div>
    );
};

ReadingLibrary.propTypes = {
    libraryStatus: PropTypes.bool.isRequired,
    setLibraryStatus: PropTypes.func.isRequired,
    reciter: PropTypes.string.isRequired,
    setReciter: PropTypes.func.isRequired,
    currentIndex: PropTypes.number.isRequired,
    setCurrentIndex: PropTypes.func.isRequired,
};

export default ReadingLibrary;
