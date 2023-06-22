import {  useEffect } from "react";

import useLoadingStatus from "./useLoadingStatus";

export const useSurahs = ({ setCurrentSurahAudio, setCurrentSurah,setSurahs }) => {

    const { setLoading, setError } = useLoadingStatus();

    useEffect(() => {
        const fetchSurahs = async () => {
            try {
                const response = await fetch(
                    "https://api.alquran.cloud/v1/quran/en.asad"
                );
                const { data } = await response.json();
                const surahData = data.surahs;
                setSurahs(surahData);
                setCurrentSurah(surahData[0]);
                setCurrentSurahAudio(
                    "https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/1.mp3"
                );
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError("Failed to fetch surahs. Please try again later.");
                setLoading(false);
            }
        };

        fetchSurahs();
    }, []);
};
