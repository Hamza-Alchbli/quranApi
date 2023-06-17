import { faQuran } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Nav({ libraryStatus, setLibraryStatus }) {
    return (
        <nav>
            <h1>Quranic Waves</h1>
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                Library
                <FontAwesomeIcon icon={faQuran} size="lg" />
            </button>
        </nav>
    );
}

export default Nav;
