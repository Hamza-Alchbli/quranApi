import useCurrentPage from "./hooks/useCurrentPage";
import Loader from "./Loader";
import { useEffect, useState } from "react";
// import LanguageIdentifiers from "./LanguageIdentifiers";

const ReadingArea = () => {
    const { pageData } = useCurrentPage();

    return (
        <div className="page-container">
            <div className="page-header">
                {Object.keys(pageData).length > 0 ? <></> : <Loader />}
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

export default ReadingArea;
