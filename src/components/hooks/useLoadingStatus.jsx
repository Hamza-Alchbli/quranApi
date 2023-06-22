import { useState } from "react";

const useLoadingStatus = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    return { loading, error, setLoading, setError };
};

export default useLoadingStatus;
