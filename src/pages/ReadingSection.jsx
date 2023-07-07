import AnimatedPage from "../components/AnimatedPage";
import Loader from "../components/Loader";
import useLoadingStatus from "../components/hooks/useLoadingStatus";
import ReadingLibrary from "../components/ReadingLibrary";
import ReadingArea from "../components/ReadingArea";
import PropTypes from "prop-types";

const ReadingSection = ({
    setLibraryStatus,
    libraryStatus,
    reciter,
    setReciter,
    currentIndex,
    setCurrentIndex,
}) => {
    const { error, loading } = useLoadingStatus();
    return (
        <AnimatedPage>
            {loading ? (
                <Loader />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <ReadingLibrary
                        {...{
                            libraryStatus,
                            setLibraryStatus,
                            reciter,
                            setReciter,
                            currentIndex,
                            setCurrentIndex,
                        }}
                    />
                    <ReadingArea
                        {...{
                            reciter,
                            setReciter,
                            currentIndex,
                            setCurrentIndex,
                        }}
                    />
                </>
            )}
        </AnimatedPage>
    );
};

ReadingSection.propTypes = {
    libraryStatus: PropTypes.bool.isRequired,
    setLibraryStatus: PropTypes.func.isRequired,
    reciter: PropTypes.string.isRequired,
    setReciter: PropTypes.func.isRequired,
    currentIndex: PropTypes.number.isRequired,
    setCurrentIndex: PropTypes.func.isRequired,
};
export default ReadingSection;
