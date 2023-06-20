import PropTypes from "prop-types";

function LibrarySurah({ generateSurahAudioURL, surah, index }) {
    return (
        <div
            className="library-surahs"
            onClick={() => {
                generateSurahAudioURL(index);
            }}
        >
            {/* <p>{surah.name}</p> */}
            <img src="/quran-ar.webp" alt="quran" />
            <div className="surah-info">
                <h3>{surah.englishName}</h3>
                <p>{surah.englishNameTranslation}</p>
            </div>
        </div>
    );
}

LibrarySurah.propTypes = {
    generateSurahAudioURL: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    surah: PropTypes.shape({
        englishName: PropTypes.string.isRequired,
        englishNameTranslation: PropTypes.string.isRequired,
    }),
};
export default LibrarySurah;
