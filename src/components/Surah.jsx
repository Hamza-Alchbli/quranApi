import PropTypes from "prop-types";

function Surah({ currentSurah }) {
    return (
        <div className="surah-container">
            <img alt="Alafasy" src="/alafasy.jpg" />
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
};

export default Surah;
