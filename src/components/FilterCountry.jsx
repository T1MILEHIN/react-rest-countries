import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CountryCard from "./CountryCard";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

export default function FilterCountry() {
    const {filter} = useParams();
    const api = 'https://restcountries.com/v3.1/all';
    const [data, setData] = useState([])
    const [loadingAll, setLoadingAll] = useState(false)
    const [error, setError] = useState(null);
    const fetchAll = async()=> {
        try {
            const response = await fetch(api)
            if (!response || !response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jsondata = await response.json()
            setLoadingAll(false)
            setData(jsondata)
            setError(null);
        } catch (error) {
            setError('An error occurred while fetching data.')
            setLoadingAll(false)
        } 
    }
    useEffect(()=>{
        setLoadingAll(true);
        fetchAll();
    }, [])
    const countries = data.map((country, index)=> < CountryCard key={index} index={index} {...country}/>)
    const filtered = data.filter((country)=> (country.region) === filter).map((country, index)=> <CountryCard key={index} index={index} {...country}/>)
    const ALL = filter === "all" ? countries : filtered
    return (
        <>
            {error && <motion.p initial={{y:'-30px', opacity:0}} animate={{y:0, opacity:1}} className="font-extrabold text-center text-xl lg:text-4xl text-red-600">{error}</motion.p>}
            <motion.p initial={{scale: 0.5}} animate={{scale: 1.1}} exit={{scale: 0.5}} className="text-center font-bold text-xl md-text-4xl">{ALL.length} countries</motion.p>
            <div className="p-2 md:p-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
                {loadingAll ? <div className="col-span-6"><Loader/></div> : ALL}
            </div>
        </>
    )
}