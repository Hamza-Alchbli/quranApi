import { Route, Routes, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import AnimatedPage from "./components/AnimatedPage";
import Nav from "./components/Nav";
import AudioPlayer from "./pages/AudioPlayer";
import ReadingSection from "./pages/ReadingSection";
import useLoadingStatus from "./components/hooks/useLoadingStatus.jsx";
import Loader from "./components/Loader";

function App() {
    const { error, loading } = useLoadingStatus();
    const [libraryStatus, setLibraryStatus] = useState(false);
    const location = useLocation();

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <Nav {...{ libraryStatus, setLibraryStatus }} />
                    <div
                        className={`App ${
                            libraryStatus ? "library-active" : ""
                        }`}
                    >
                        <AnimatePresence mode="wait">
                            <Routes location={location} key={location.pathname}>
                                <Route
                                    path="/"
                                    element={
                                        <AnimatedPage>
                                            <AudioPlayer
                                                {...{
                                                    libraryStatus,
                                                    setLibraryStatus,
                                                }}
                                            />
                                        </AnimatedPage>
                                    }
                                />

                                <Route
                                    path="/read"
                                    element={
                                        <AnimatedPage>
                                            <ReadingSection />
                                        </AnimatedPage>
                                    }
                                />
                            </Routes>
                        </AnimatePresence>
                    </div>
                </>
            )}
        </>
    );
}

export default App;
