import PropTypes from "prop-types";

function Surah({ currentSurah }) {
    return (
        <div className="surah-container">
            <img alt="Alafasy" src="/alafasy.jpg" />
            <h2>{currentSurah.englishName}</h2>
            <h3>{currentSurah.englishNameTranslation}</h3>
        </div>
    );
}

Surah.propTypes = {
    currentSurah: PropTypes.shape({
        englishName: PropTypes.string.isRequired,
        englishNameTranslation: PropTypes.string.isRequired,
    }).isRequired,
};

export default Surah;
