import PropTypes from "prop-types";

function Surah({ currentSurah,reciter }) {
    return (
        <div className="surah-container">
            <img alt={reciter} src={`${reciter}.jpg`} />
            <h2>{currentSurah.name}</h2>
            <h3>{currentSurah.englishNameTranslation} || {currentSurah.englishName}</h3>
        </div>
    );
}

Surah.propTypes = {
    currentSurah: PropTypes.shape({
        name: PropTypes.string.isRequired,
        englishName: PropTypes.string.isRequired,
        englishNameTranslation: PropTypes.string.isRequired,
    }).isRequired,
    reciter: PropTypes.string.isRequired,
};

export default Surah;
