import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchCountryData from "../components/searchCountry";
import Loader from "../components/Loader";
import { Outlet, NavLink } from "react-router-dom";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const api = 'https://restcountries.com/v3.1/all';
const searchCountryEndPoint = `https://restcountries.com/v3.1/name/`

const FetchData = () => {
    const [data, setData] = useState([])
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
        fetchdata()
    }, [])
    const searchCountry = searchData.map((country, index)=> <SearchCountryData key={index} {...country}/>)
    // MAPPED REGION 👇
    const sortedCountries = data.map((country)=> (country.region)).filter((x)=> x).sort()
    const uniqueStrings = sortedCountries.reduce((accumulator, currentValue) => {
    accumulator[currentValue] = true;
        return accumulator;
    }, {});
    const filterer = Object.keys(uniqueStrings);
    return (
        <div className="overflow-x-hidden">
            <form action="" onSubmit={findButton} >
                <div className="px-2 lg:px-10 lg:pt-10 pt-2">
                    <input name="country_name" value={search} onChange={handleSearch} type="text" placeholder="Search Country" className="w-full lg:w-[500px] pl-2 font-bold mb-2 block border-2 border-black h-10"/>
                    <motion.button type="submit" whileTap={{scale: 0.9}} className="font-bold p-2 rounded-lg bg-blue-400">SEARCH</motion.button>
                </div>
            </form>
            {loadingSearch ? <Loader /> : error && <motion.p initial={{y:'-30px', opacity:0}} animate={{y:0, opacity:1}} className="font-extrabold text-center text-xl lg:text-4xl text-red-600">{error}</motion.p>}
            <div className="min-h-[60vh] p-2 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-5">
                {(!loadingSearch && !error) && searchCountry}
            </div>
            <hr className="my-5 border-black border-2" />
            <h1 className="text-center font-bold lg:text-3xl text-xl">List of all Countries</h1>
            {/* NAV TO FILTER ALL COUNTRIES */}
            <nav className="my-4 md:my-5 w-fit">
                <Splide options={{
                    pagination: false,
                    perPage: 4,
                    drag: 'free',
                    start: 0,
                    breakpoints: {
                        640 : { perPage: 4, perMove: 1, arrows: false, trimSpace: false, focus: 'center',},
                    },
                }} className="duration-500 text-center flex items-center gap-2 md:gap-8 font-black text-xl md:text-2xl">
                    <SplideSlide><motion.li whileTap={{scale: 0.9}} whileHover={{scale: 1.1}}><NavLink className={({isActive})=> isActive ? "text-red-600 border-red-600 border-b-4" : ""} to={"/all"}>ALL</NavLink></motion.li></SplideSlide>
                    {filterer.map((link, index)=> <SplideSlide><motion.li whileTap={{scale: 0.9}} whileHover={{scale: 1.1}} key={index}><NavLink className={({isActive})=> isActive ? "text-red-600 border-red-600 border-b-4" : ""} to={`/${link}`}>{link}</NavLink></motion.li></SplideSlide>)}
                </Splide>
            </nav>
            <Outlet />
        </div>
    )
}


export default FetchData;