function Surah({ currentSurah, reciter }) {
    return (
        <div className="surah-container">
            <img alt={reciter} src="/alafasy.jpg"></img>
            <h2>{currentSurah}</h2>
            <h3>{reciter}</h3>
        </div>
    );
}

export default Surah;
