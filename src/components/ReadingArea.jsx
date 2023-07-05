import useCurrentPage from "./hooks/useCurrentPage";
import Loader from "./Loader";
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
                            {pageData.map((aya) => {
                                let phrase = [];
                                let currentSpan = null;
                                aya.words.forEach((word) => {
                                    if (/\(\d+\)/.test(word.translation.text)) {
                                        if (currentSpan) {
                                            phrase.push(" ");
                                            phrase.push(currentSpan);
                                            currentSpan = null;
                                        }
                                        const number =
                                            word.translation.text.replace(
                                                /[()]/g,
                                                ""
                                            );
                                        currentSpan = (
                                            <span key={word.id}>
                                                ({number})
                                            </span>
                                        );
                                    } else {
                                        const text = word.translation.text;
                                        const span = currentSpan ? (
                                            <span key={word.id}>{text}</span>
                                        ) : (
                                            text
                                        );
                                        phrase.push(span);
                                    }
                                });
                                if (currentSpan) {
                                    phrase.push(" ");
                                    phrase.push(currentSpan);
                                }
                                return <p key={aya.verse_key}>{phrase} </p>;
                            })}
                        </>
                    ) : (
                        <Loader />
                    )}
                </div>
                <div className="page arabic">
                    {Object.keys(pageData).length > 0 ? (
                        <>
                            {pageData.map((aya) => {
                                // {
                                //     console.log(aya);
                                // }
                                return (
                                    <p key={aya.id}>
                                        {aya.words.map((word) => (
                                            <span
                                                key={`${aya.verse_key}-${word.id}`}
                                            >
                                                {`${word.text} `} 
                                            </span>
                                        ))}
                                        <br></br>
                                    </p>
                                );
                            })}
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
