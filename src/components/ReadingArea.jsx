import useCurrentPage from "./hooks/useCurrentPage";
import PropTypes from "prop-types";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { useSurahs } from "./hooks/useSurahs";
const ReadingArea = ({
    reciter,
    setReciter,
    currentIndex,
    setCurrentIndex,
}) => {
    const { pageData } = useCurrentPage();
    const {surahs,currentSurah} = useSurahs(reciter,currentIndex);
    // const currentSurah = surahs.filter((surah) => surah.pages[0] === pageData[0].page_number);

    return (
        <div className="page-container">
            <div className="page-header">
                {Object.keys(pageData).length > 0 && surahs ? <>
                    <h1>{`${currentSurah.translated_name.name} || ${currentSurah.name_simple} || ${currentSurah.name_arabic}`}</h1>
                </> : <Loader />}
            </div>
            <div className="pages">
                <div className="page">
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
                </div>
                <div className="page arabic">
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
        </div>
    );
};

ReadingArea.propTypes = {
    reciter: PropTypes.string.isRequired,
    setReciter: PropTypes.func.isRequired,
    currentIndex: PropTypes.number.isRequired,
    setCurrentIndex: PropTypes.func.isRequired,
};
export default ReadingArea;
