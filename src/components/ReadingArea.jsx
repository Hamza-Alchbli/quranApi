import PropTypes from "prop-types";
import Loader from "./Loader";
import { useEffect } from "react";
import { useSurahs } from "./hooks/useSurahs";
const ReadingArea = ({
    reciter,
    currentIndex,
    setCurrentIndex,
    pageData,
    currentPage,
    setCurrentPage,
}) => {
    const { surahs, currentSurah, setCurrentSurah } = useSurahs(
        reciter,
        currentIndex
        );
        // const currentSurah = surahs.filter((surah) => surah.pages[0] === pageData[0].page_number);
    useEffect(() => {
        // find the surah which includes the currentPage
        const newSurah = surahs.find(
            (surah) =>
            currentPage >= surah.pages[0] && currentPage <= surah.pages[1]
            );
            
            if (newSurah && newSurah.id !== currentSurah.id) {
                // update the currentSurah state
                setCurrentSurah(newSurah);
                setCurrentIndex(newSurah.id);
                // console.log(newSurah);
            }
    }, [currentPage, surahs]);
    return (
        <div className="page-container">
            <div className="page-header">
                {Object.keys(pageData).length > 0 && surahs ? (
                    <>
                        {/* <h1>{`${currentSurah.translated_name.name} || ${currentSurah.name_simple} || ${currentSurah.name_arabic}`}</h1> */}
                        {currentSurah.id ? (
                            <div className="surah-name">
                                <h1>{`${currentSurah.id
                                    .toString()
                                    .padStart(3, "0")}`}</h1>
                                <h1>surah</h1>
                            </div>
                        ) : (
                            <Loader />
                        )}
                    </>
                ) : (
                    <Loader />
                )}
            </div>
            <div className="pages">
                {/* <div className="page">
                    {Object.keys(pageData).length > 0 ? (
                        <>
                            {pageData
                                .reduce((groups, word) => {
                                    if (!groups[word.line_number]) {
                                        groups[word.line_number] = [];
                                    }
                                    groups[word.line_number].push(word);
                                    return groups;
                                }, [])
                                .map((group, index) => (
                                    <div
                                        key={index}
                                        className={`line-${group[0].line_number}`}
                                    >
                                        {group.map((word) => (
                                            <span key={word.id}>
                                                {word.translation.text + " "}
                                            </span>
                                        ))}
                                    </div>
                                ))}
                        </>
                    ) : (
                        <Loader />
                    )}
                </div> */}

                <div
                    className="page arabic"
                    style={{
                        fontFamily: `QCF_P${currentPage
                            .toString()
                            .padStart(3, "0")},serif`,
                    }}
                >
                    {Object.keys(pageData).length > 0 ? (
                        <>
                            {pageData
                                .reduce((groups, word) => {
                                    if (!groups[word.line_number]) {
                                        groups[word.line_number] = [];
                                    }
                                    groups[word.line_number].push(word);
                                    return groups;
                                }, [])
                                .map((group, index) => (
                                    <div
                                        key={index}
                                        className={`line-${group[0].line_number}`}
                                    >
                                        {group.map((word) => (
                                            <span key={word.id}>
                                                {word.text}
                                            </span>
                                        ))}
                                    </div>
                                ))}
                        </>
                    ) : (
                        <Loader />
                    )}
                </div>
            </div>
            <div className="page-footer">
                {currentPage == 1 ? (
                    ""
                ) : (
                    <button
                        onClick={() => {
                            setCurrentPage(currentPage - 1);
                        }}
                    >
                        Previous Page
                    </button>
                )}
                {currentPage == 604 ? (
                    ""
                ) : (
                    <button
                        onClick={() => {
                            setCurrentPage(currentPage + 1);
                        }}
                    >
                        Next Page
                    </button>
                )}
            </div>
        </div>
    );
};
ReadingArea.defaultProps = {
    pageData: [], // Provide a default value (object in this case)
};

ReadingArea.propTypes = {
    reciter: PropTypes.string.isRequired,
    setReciter: PropTypes.func.isRequired,
    currentIndex: PropTypes.number.isRequired,
    setCurrentIndex: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    // pageData: PropTypes.object,
    setCurrentPage: PropTypes.func,
};
export default ReadingArea;
