function Surah({ currentSurah }) {
    // console.log(currentSurah.edition.englishName);
    return (
        <div className="surah-container">
            <img alt="Alafasy" src="/alafasy.jpg"></img>
            <h2>{currentSurah.englishName}</h2>
            <h3>{currentSurah.englishNameTranslation}</h3>
        </div>
    );
}

export default Surah;
