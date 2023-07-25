import PropTypes from "prop-types";
function AudioSurah({
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
            onClick={selectSurah}
        >
            <div className="surah-info">
                <h3>{surah.name_arabic}</h3>
                <p>
                    {surah.name_simple} || {surah.translated_name.name}
                </p>
                <p>
                    Page: {surah.pages[0]} || Verses: {surah.verses_count}
                </p>
            </div>
        </div>
    );
}

AudioSurah.propTypes = {
    generateSurahAudioURL: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    surah: PropTypes.shape({
        name_arabic: PropTypes.string.isRequired,
        name_simple: PropTypes.string.isRequired,
        translated_name: PropTypes.object.isRequired,
        pages: PropTypes.array.isRequired,
        verses_count: PropTypes.number.isRequired
    }),
    playSongHandler: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    currentSurah: PropTypes.object.isRequired,
    reciter: PropTypes.string.isRequired,
    setCurrentIndex: PropTypes.func,
    setLibraryStatus: PropTypes.func.isRequired,
    libraryStatus: PropTypes.bool.isRequired,
};
export default AudioSurah;
