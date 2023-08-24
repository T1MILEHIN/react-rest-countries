import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CountryCard from "../components/CountryCard";
import SearchCountryData from "../components/searchCountry";
import Loader from "../components/Loader";
import Nav from "../components/Nav";

const api = 'https://restcountries.com/v3.1/all';
const searchCountryEndPoint = `https://restcountries.com/v3.1/name/`

const FetchData = () => {
    const [data, setData] = useState([])
    const [loadingAll, setLoadingAll] = useState(false)
    const [loadingSearch, setLoadingSearch] = useState(false)
    const [search, setSearch] = useState('')
    const [searchData, setSearchData] = useState([])
    const [error, setError] = useState(null);
    const fetchdata = async() => {
        try {
            const response = await fetch(api)
            if (!response || !response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            if (!navigator.onLine) {
                setError('No internet connectivity.');
                return;
            }
            const jsondata = await response.json()
            setData(jsondata)
            setError(null);
            setLoadingAll(false)
        } catch (error) {
            setError('An error occurred while fetching data.')
        }
        
    }
    const handleSearch = (event) => {
        setSearch(event.target.value)
    }
    const fetchSearchedCountry = async(COUNTRYNAME) => {
        try {
            const response = await fetch(`${searchCountryEndPoint}${COUNTRYNAME}`)
            if (!response || !response.ok){
                throw new Error(`${search} is not a valid country name`);
            }
            if (!navigator.onLine) {
                setError('No internet connectivity.');
                return;
            }
            
            const data = await response.json()
            setSearchData(data)
            setError(null);
            setLoadingSearch(false)
        } catch (error) {
            setLoadingSearch(false)
            setError(error.message);
            setSearchData([])
        }
    }
    const findButton = (e) => {
        e.preventDefault()
        setLoadingSearch(true)
        fetchSearchedCountry(search)
    }
    useEffect(()=>{
        setLoadingAll(true)
        fetchdata()
    }, [])
    const countries = data.map((country, index)=> < CountryCard key={index} index={index} {...country}/>)
    const searchCountry = searchData.map((country, index)=> <SearchCountryData key={index} {...country}/>)
    return (
        <div>
            <Nav />
            <form action="" onSubmit={findButton} >
                <div className="px-2 lg:px-10 lg:pt-10 pt-2">
                    <input name="country_name" value={search} onChange={handleSearch} type="text" placeholder="Search Country" className="w-full lg:w-[500px] pl-2 font-bold mb-2 block border-2 border-black h-10"/>
                    <motion.button type="submit" whileTap={{scale: 0.9}} className="font-bold p-2 rounded-lg bg-blue-400">SEARCH</motion.button>
                </div>
            </form>
            {loadingSearch ? <Loader /> : error && <motion.p initial={{y:'-30px', opacity:0}} animate={{y:0, opacity:1}} className="font-extrabold text-center text-xl lg:text-4xl text-red-600">{error}</motion.p>}
            <div className="min-h-[60vh] p-2 lg:p-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
                {(!loadingSearch && !error) && searchCountry}
            </div>
            <hr className="my-5 border-black border-2" />
            <h1 className="text-center font-bold lg:text-3xl text-xl">List of all Countries</h1>
            {loadingAll ? <Loader /> : <div className="p-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">{countries}</div> }
        </div>
    )
}


export default FetchData;