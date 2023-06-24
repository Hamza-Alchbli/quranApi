import { useState, useEffect } from "react";
import useLoadingStatus from "./useLoadingStatus";

const useAllLang = () => {
    const [allLang, setAllLang] = useState();

    const { setLoading, setError } = useLoadingStatus();

    useEffect(() => {
        const fetchLang = async () => {
            try {
                const response = await fetch(
                    `https://api.quran.com/api/v4/resources/languages`
                );
                const clonedResponse = response.clone();
                const data = await clonedResponse.json();
                const langData = data.languages;
                setAllLang(langData);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError("Failed to fetch langs. Please try again later.");
                setLoading(false);
            }
        };
        fetchLang();
    }, [setError,setLoading]);
    return allLang
};

export default useAllLang;
