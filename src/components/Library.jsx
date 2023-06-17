import LibrarySurah from "./LibrarySurah";

function Library({ surahs, libraryStatus, generateSurahAudioURL }) {
    return (
        <div className={`library ${libraryStatus ? "active-library" : ""}`}>
            <h2>Quran Library</h2>
            {surahs.map((surah, index) => {
                return (
                    <LibrarySurah
                        key={surah.name}
                        generateSurahAudioURL={generateSurahAudioURL}
                        surah={surah}
                        index={index}
                    ></LibrarySurah>
                );
            })}
        </div>
    );
}

export default Library;
