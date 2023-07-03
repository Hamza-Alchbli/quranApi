import useLoadingStatus from "./useLoadingStatus";
import { useState, useEffect } from "react";
const useCurrentPage = ({ currentPage = 1, lang = "en" }) => {
    const [pageData, setPageData] = useState();
    const { setLoading, setError } = useLoadingStatus();

    useEffect(() => {
        const fetchLang = async () => {
            try {
                const response = await fetch(
                    `https://api.quran.com/api/v4/verses/by_page/${currentPage}?language=${lang}&words=true&page=1&per_page=10`
                );
                const clonedResponse = response.clone();
                const data = await clonedResponse.json();
                const pageData = data.verses;
                setPageData(pageData);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError("Failed to fetch langs. Please try again later.");
                setLoading(false);
            }
        };
        fetchLang();
    }, [currentPage,lang,setError,setLoading]);
    return pageData;
};

export default useCurrentPage;
