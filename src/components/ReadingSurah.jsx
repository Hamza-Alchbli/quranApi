import PropTypes from "prop-types";
import useCurrentPage from "./hooks/useCurrentPage";
const ReadingSurah = ({
    surah,
    index,
    currentSurah,
    libraryStatus,
    setLibraryStatus,
    setCurrentIndex,
    setCurrentPage,
    currentPage,
}) => {


    const selectSurah = () => {
        setCurrentIndex(index + 1);

        if (libraryStatus) {
            setLibraryStatus(!libraryStatus);
        }
        setCurrentPage(surah.pages[0]);
    };

    return (
        <div
            className={
                currentSurah.translated_name.name === surah.translated_name.name
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
};

ReadingSurah.propTypes = {
    surah: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    currentSurah: PropTypes.object.isRequired,
    libraryStatus: PropTypes.bool.isRequired,
    setLibraryStatus: PropTypes.func.isRequired,
    setCurrentIndex: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
};

export default ReadingSurah;
