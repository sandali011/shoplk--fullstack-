import {useState,useEffect} from 'react';

export function useFetch(url){
    const [data,setData] = useState(null);
    const [loading,setLoading] =useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        const controller = new AbortController();

        async function fetchData(){
            setLoading(true);
            setError(null);
            try{
                const res =  await fetch(url,{signal:controller.signal});
                if(!res.ok) throw new Error('Could not fetch the data for that resources("+res.status+")');
                const json = await res.json();
                setData(json);
            } catch (err){
                if(err.name !=="AbortError") setError(err.message);
            }finally{
                if(!controller.signal.aborted) setLoading(false);
            }
        }
        fetchData();

        return()=>controller.abort();

    },[url]);

    return {data,loading,error};
}