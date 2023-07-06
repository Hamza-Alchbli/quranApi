import useLoadingStatus from "./useLoadingStatus";
import { useState, useEffect } from "react";
const useCurrentPage = () => {
    const [pageData, setPageData] = useState({});

    const { setLoading, setError } = useLoadingStatus();
    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const response = await fetch(
                    `https://api.quran.com/api/v4/verses/by_page/1?language=ar&words=true&page=1&per_page=10`
                );
                const clonedResponse = response.clone();
                const data = await clonedResponse.json();
                const pageData = data.verses;
                // console.log(pageData);
                setLoading(false);
                
                const pageWords = [];
                const makePageWords = () => {
                    if (Object.keys(pageData).length > 0) {
                        pageData.map((aya) => {
                            aya.words.map((word) => {
                                pageWords.push(word);
                            });
                        });
                    }
                };
                setPageData(pageWords);
                makePageWords();
                
            } catch (error) {
                console.log(error);
                setError("Failed to fetch langs. Please try again later.");
                setLoading(false);
            }
        };

        fetchPageData();
    }, [setError, setLoading]);

    return { pageData };
};

export default useCurrentPage;
