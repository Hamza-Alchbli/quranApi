function Surah({ currentSurah}) {
    // console.log(currentSurah.edition.englishName);
    return (
        <div className="surah-container">
            {currentSurah.edition ? (
                <>
                    <img
                        alt={currentSurah.edition.englishName}
                        src="/alafasy.jpg"
                    ></img>
                    <h2>{currentSurah.englishName}</h2>
                    <h3>{currentSurah.edition.englishName}</h3>
                </>
            ) : (
                <p>Loading..</p>
            )}
        </div>
    );
}

export default Surah;
