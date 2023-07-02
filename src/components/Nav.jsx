import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { faQuran, faNavicon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Nav({ libraryStatus, setLibraryStatus }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav>
            <h1>
                Quranic
                <img src="/icons/waves.svg" alt="waves" />
                Waves
            </h1>
            <div className="nav-links">
                <button onClick={() => setLibraryStatus(!libraryStatus)}>
                    Library
                    <FontAwesomeIcon icon={faQuran} size="lg" />
                </button>
                <div
                    className={`dropdown-container ${
                        dropdownOpen ? "open" : ""
                    }`}
                >
                    <button
                        onClick={toggleDropdown}
                        className="dropdown-button"
                    >
                        <FontAwesomeIcon icon={faNavicon} size="lg" />
                    </button>

                    <ul className="dropdown-content ">
                        <Link
                            to="/"
                            onClick={() => {
                                setLibraryStatus(false);
                                toggleDropdown();
                            }}
                        >
                            <li>Audio Steam</li>
                        </Link>
                        <Link
                            to="/read"
                            onClick={() => {
                                setLibraryStatus(false);
                                toggleDropdown();
                            }}
                        >
                            <li>Reading Section</li>
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

Nav.propTypes = {
    libraryStatus: PropTypes.bool.isRequired,
    setLibraryStatus: PropTypes.func.isRequired,
};

export default Nav;
