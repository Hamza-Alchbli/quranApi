import PropTypes from "prop-types";

import { faQuran } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Nav({ libraryStatus, setLibraryStatus }) {
    return (
        <nav>
            <h1>
                Quranic
                <img src="/icons/waves.svg" alt="waves" />
                Waves
            </h1>
            <div>
                <button onClick={() => setLibraryStatus(!libraryStatus)}>
                    Library
                    <FontAwesomeIcon icon={faQuran} size="lg" />
                </button>
            </div>
        </nav>
    );
}

Nav.propTypes = {
    libraryStatus: PropTypes.bool.isRequired,
    setLibraryStatus: PropTypes.func.isRequired,
};

export default Nav;
