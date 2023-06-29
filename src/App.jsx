import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useState } from "react";

import Nav from "./components/Nav";
import AudioPlayer from "./components/pages/AudioPlayer";
import ReadingSection from "./components/pages/ReadingSection";
import useLoadingStatus from "./components/hooks/useLoadingStatus.jsx";

function App() {
    const { error, loading } = useLoadingStatus();
    const [libraryStatus, setLibraryStatus] = useState(false);

    return (
        <Router>
            {loading ? (
                <p>Loading website...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className={`App ${libraryStatus ? "library-active" : ""}`}>
                    <Nav {...{ libraryStatus, setLibraryStatus }} />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <AudioPlayer
                                    {...{ libraryStatus, setLibraryStatus }}
                                />
                            }
                        />
                        <Route path="/read" element={<ReadingSection />} />
                    </Routes>
                </div>
            )}
        </Router>
    );
}

export default App;
