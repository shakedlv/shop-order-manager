import { useEffect, useState } from "react";
import api from "../utils/api";
import axios from "axios";

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const source = axios.CancelToken.source();
        api.get(url, { cancelToken: source.token })
            .then((result) => {
                if(result.status === 200)
                {
                    var cats = result.data;
                    setData(cats);
                    setLoading(false)
                }

            }).catch((err)=>{
                setError(err)
                setLoading(true)
            })

            return () => {
                source.cancel();
            }
    }, [url]);


    
    return { data, error, loading };
};