import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import AnimatedPage from "./components/AnimatedPage";
import Nav from "./components/Nav";
import AudioPlayer from "./pages/AudioPlayer";
import useLoadingStatus from "./components/hooks/useLoadingStatus.jsx";
import Loader from "./components/Loader";

function App() {
    const { error, loading } = useLoadingStatus();
    const [libraryStatus, setLibraryStatus] = useState(false);
    const [reciter, setReciter] = useState("mishari_al_afasy");
    const [currentIndex, setCurrentIndex] = useState(1);
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
                                                    reciter,
                                                    setReciter,
                                                    currentIndex,
                                                    setCurrentIndex,
                                                }}
                                            />
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
