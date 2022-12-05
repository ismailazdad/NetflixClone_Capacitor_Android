import {useContext, useEffect, useState} from 'react'

export function useFetch(url,random=false) {
    console.log(url);
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch(url)
            .then((response) => response.json())
            .then((jsonResponse) => {
                if(random){
                    console.log(jsonResponse);
                    setData(
                        jsonResponse.results[
                            Math.floor(Math.random() * jsonResponse.results.length)
                            ],
                    );
                }else{
                    setData(jsonResponse?jsonResponse:undefined)
                }

            })
            .catch(e => {
                console.log(e)
                setError(true)
            })
            .finally( e =>{
                    setLoading(false)
                }
            )
    }, [url])
    return {isLoading, data,error}



}