import PropTypes from "prop-types";
function LibrarySurah({
    generateSurahAudioURL,
    surah,
    index,
    playSongHandler,
    isPlaying,
    currentSurah,
    reciter,
    setCurrentIndex,
    libraryStatus,
    setLibraryStatus,
}) {

    const selectSurah = () => {
        generateSurahAudioURL(index, reciter);
        setCurrentIndex(index + 1);

        if (!isPlaying) {
            playSongHandler();
        }
        if (libraryStatus) {
            setLibraryStatus(!libraryStatus);
        }
    };


    return (
        <div
            className={
                currentSurah.translated_name.name == surah.translated_name.name
                    ? "library-surahs selected"
                    : "library-surahs"
            }
        >
            <img src="/quran-ar.webp" alt="quran" onClick={selectSurah} />
            <div className="surah-info" onClick={selectSurah}>
                <h3>{surah.name_arabic}</h3>
                <p>
                    {surah.name_simple} || {surah.translated_name.name}
                </p>
            </div>
        </div>
    );
}

LibrarySurah.propTypes = {
    generateSurahAudioURL: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    surah: PropTypes.shape({
        name_arabic: PropTypes.string.isRequired,
        name_simple: PropTypes.string.isRequired,
        translated_name: PropTypes.object.isRequired,
    }),
    playSongHandler: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    currentSurah: PropTypes.object.isRequired,
    reciter: PropTypes.string.isRequired,
    setCurrentIndex: PropTypes.func,
    setLibraryStatus: PropTypes.func.isRequired,
    libraryStatus: PropTypes.bool.isRequired,
};
export default LibrarySurah;
