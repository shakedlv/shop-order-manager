import { useEffect, useState } from "react";
import api from "../utils/api";
import axios from "axios";

export const useFetch = (initialUrl) => {
    const [url, setUrl] = useState(initialUrl)
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [refetchIndex, setRefetchIndex] = useState(0)

    useEffect(() => {
        fetchData()
    }, [url, refetchIndex]);

    const refetch = () => {
        setRefetchIndex((prevRefetchIndex) => prevRefetchIndex + 1);
        console.log(refetchIndex);
    }

    const fetchData = () => {
        setLoading(true);

        const source = axios.CancelToken.source();
        api.get(url, { cancelToken: source.token })
            .then((result) => {
                if (result.status === 200) {
                    var cats = result.data;
                    setData(cats);
                    setLoading(false)
                }

            }).catch((err) => {
                setError(err)
                setLoading(true)
            })
        return () => {
            source.cancel();
        }
    }

    return { data, error, loading, refetch };
};


export const useLocalStorage = (key , initialValue) =>{

    const [value, setValue] = useState(()=>{
        const json = localStorage.getItem(key)
        if(json != null) return JSON.parse(json)
        else return initialValue
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key,value])

    return [value,setValue]
    
}