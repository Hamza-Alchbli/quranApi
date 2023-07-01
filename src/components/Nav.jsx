import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
                {/* <Link to="/">
                    <button>Listen</button>
                </Link>
                <Link to="/read">
                    <button>Read</button>
                </Link> */}
            </div>
        </nav>
    );
}

Nav.propTypes = {
    libraryStatus: PropTypes.bool.isRequired,
    setLibraryStatus: PropTypes.func.isRequired,
};

export default Nav;
