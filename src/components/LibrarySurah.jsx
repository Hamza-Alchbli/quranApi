import PropTypes from "prop-types";

function LibrarySurah({
    generateSurahAudioURL,
    surah,
    index,
    playSongHandler,
    isPlaying,
    currentSurah,
    reciter
}) {
    return (
        <div
            className={currentSurah.englishName == surah.englishName ? "library-surahs selected" : "library-surahs"}
            onClick={() => {
                generateSurahAudioURL(index,reciter);
                if (!isPlaying) {
                    playSongHandler();
                }
            }}
        >
            {/* <p>{surah.name}</p> */}
            <img src="/quran-ar.webp" alt="quran" />
            <div className="surah-info">
                <h3>{surah.name}</h3>
                <p>{surah.englishName} || {surah.englishNameTranslation}</p>
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
        name: PropTypes.string.isRequired
    }),
    playSongHandler: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    currentSurah: PropTypes.object.isRequired,
    reciter: PropTypes.string.isRequired,
};
export default LibrarySurah;
