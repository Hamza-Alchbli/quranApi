import AnimatedPage from "../components/AnimatedPage";
import Loader from "../components/Loader";
import useLoadingStatus from "../components/hooks/useLoadingStatus";
import ReadingLibrary from "../components/ReadingLibrary";
import ReadingArea from "../components/ReadingArea";
import PropTypes from "prop-types";

const ReadingSection = ({ setLibraryStatus, libraryStatus }) => {
    const { error, loading } = useLoadingStatus();

    return (
        <AnimatedPage>
            {loading ? (
                <Loader />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <ReadingLibrary {...{ libraryStatus, setLibraryStatus }} />
                    <ReadingArea />
                </>
            )}
        </AnimatedPage>
    );
};

ReadingSection.propTypes = {
    libraryStatus: PropTypes.bool.isRequired,
    setLibraryStatus: PropTypes.func.isRequired,
};
export default ReadingSection;
