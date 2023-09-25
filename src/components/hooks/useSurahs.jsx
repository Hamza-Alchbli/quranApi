import { useEffect, useState } from "react";

import useLoadingStatus from "./useLoadingStatus";

export const useSurahs = ({ reciter = "mishari_al_afasy", currentIndex = 1  }) => {
    const [surahs, setSurahs] = useState([]);
    const [currentSurah, setCurrentSurah] = useState();
    const [currentSurahAudio, setCurrentSurahAudio] = useState(1);
    const [lang, setLang] = useState("en");

    const { setLoading, setError } = useLoadingStatus();

    useEffect(() => {
        const fetchSurahs = async () => {
            try {
                const response = await fetch(
                    `https://api.quran.com/api/v4/chapters?language=${lang}`
                );
                const clonedResponse = response.clone();
                const data = await clonedResponse.json();
                const surahData = data.chapters;
                setSurahs(surahData);
                // setCurrentSurah(surahData[0]);
                setCurrentSurah(
                    currentIndex == 1
                        ? surahData[0]
                        : surahData[currentIndex - 1]
                );
                // make current index start from 001 isntead not 1  for number 1 if the reciter is mishari_al_afasy
                if(reciter === "abdulbaset_warsh" || reciter === "abdurrashid_sufi_soosi_rec" || reciter === "noreen_siddiq"){ 
                    // make current index start from padStart 3 digit
                    setCurrentSurahAudio(
                        // `https://download.quranicaudio.com/quran/${reciter}/murattal/${currentIndex.toString().padStart(3, "0")}.mp3`
                        `https://download.quranicaudio.com/quran/${reciter}//${currentIndex.toString().padStart(3, "0")}.mp3`
                    );
                } else {
                    setCurrentSurahAudio(
                        `https://download.quranicaudio.com/qdc/${reciter}/murattal/${currentIndex}.mp3`
                    );
                }
               
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError("Failed to fetch surahs. Please try again later.");
                setLoading(false);
            }
        };

        fetchSurahs();
    }, [lang, setLoading, setError, currentIndex, reciter]);
    return {
        surahs,
        currentSurah,
        setCurrentSurah,
        currentSurahAudio,
        setCurrentSurahAudio,
        lang,
        setLang,
    };
};
useSurahs.defaultProps = {
    reciter: "mishari_al_afasy",
    currentIndex: 1,
};

