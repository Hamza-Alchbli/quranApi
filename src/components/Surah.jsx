import PropTypes from "prop-types";

function Surah({ currentSurah,reciter }) {
    return (
        <div className="surah-container">
            <img alt={reciter} src={`${reciter}.jpg`} />
            <h2>{currentSurah.name_arabic}</h2>
            <h3>{currentSurah.translated_name.name} || {currentSurah.name_simple}</h3>
        </div>
    );
}

Surah.propTypes = {
    currentSurah: PropTypes.shape({
        name_arabic: PropTypes.string.isRequired,
        name_simple: PropTypes.string.isRequired,
        translated_name: PropTypes.object.isRequired,
    }).isRequired,
    reciter: PropTypes.string.isRequired,
};

export default Surah;
