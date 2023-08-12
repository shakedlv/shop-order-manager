import { useEffect, useState } from "react";
import api from "../utils/api";
import axios from "axios";

export const useFetch = (initialUrl) => {
    const [url, setUrl] = useState(initialUrl)
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData()

    }, [url]);



    const fetchData = () => {
        setLoading(true);

        const source = axios.CancelToken.source();
        api.get(url, { cancelToken: source.token })
            .then((result) => {
                if (result.status === 200) {
                    var data = result.data;
                    setData(prev=>data);
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

    return { data, error, loading, fetchData };
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