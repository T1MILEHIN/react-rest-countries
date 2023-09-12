import { useState } from "react";
import { motion } from "framer-motion";
import SearchCountryData from "../components/searchCountry";
import Loader from "../components/Loader";
import ErrorMessage from "../components/Error";
import { Outlet, NavLink } from "react-router-dom";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import FetchAllCountries from "../hooks/FetchAllCountries";
import SearchCountry from "../hooks/SearchCountry"

const searchCountryEndPoint = `https://restcountries.com/v3.1/name/`
const FetchData = () => {
    const [search, setSearch] = useState('')
    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearch(searchTerm);
    }
    const {data: searchedCountry, error, isLoading} = SearchCountry(search, searchCountryEndPoint)
    const {data: countries} = FetchAllCountries()

    const searchCountry = searchedCountry?.data.map((country, index)=> <SearchCountryData key={index} {...country}/>)
    // MAPPED REGION 👇
    const sortedCountries = countries?.data?.map((country)=> (country.region)).filter((x)=> x).sort()
    const uniqueStrings = sortedCountries ? sortedCountries.reduce((accumulator, currentValue) => {
    accumulator[currentValue] = true;
        return accumulator;
    }, {}) : {};
    const filterer = Object.keys(uniqueStrings);
    if (error?.response?.data?.status === 404) error.message = `${search} is not a valid Country Name`;

    return (
        <div className="overflow-x-hidden">
            <form action="" >
                <div className="px-2 lg:px-10 lg:pt-2 pt-2">
                    <input name="country_name" value={search} onChange={handleSearch} type="text" placeholder="Search Country" className="w-full lg:w-[500px] pl-2 font-bold mb-2 block border-2 border-black h-10"/>
                </div>
            </form>
            {searchCountry && <p className="font-black text-lg lg:pl-10 pl-2">{searchCountry.length > 1 ? `${searchCountry.length} Results Found` : `${searchCountry.length} Result Found`}</p>}
            {isLoading ? <Loader /> : error && <ErrorMessage message={error.message} />}
            <div className="min-h-[55vh] md:min-h-[70vh] p-2 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-5">
                {(!isLoading && !error) && searchCountry}
            </div>
            <hr className="my-5 border-black border-2" />
            <h1 className="text-center font-bold lg:text-3xl text-xl">List of all Countries</h1>
            {/* NAV TO FILTER ALL COUNTRIES */}
            <nav className="my-4 md:my-5 w-fit md:mx-auto text-center">
                <Splide options={{
                    pagination: false,
                    perPage: 4,
                    perMove: 1,
                    drag: 'free',
                    start: 0,
                    trimSpace: false, 
                    focus: 'center',
                    breakpoints: {
                        768 : { perPage: 4, perMove: 1, arrows: false, trimSpace: false, focus: 'center',},
                    },
                }} className="flex items-center gap-2 md:gap-7 font-black text-xl md:text-2xl">
                    <SplideSlide><motion.li whileTap={{scale: 0.9}} whileHover={{scale: 1.1}}><NavLink className={({isActive})=> isActive ? "text-red-600 border-red-600 border-b-4" : ""} to={"/all"}>ALL</NavLink></motion.li></SplideSlide>
                    {filterer.map((link, index)=> <SplideSlide key={index}><motion.li whileTap={{scale: 0.9}} whileHover={{scale: 1.1}} key={index}><NavLink className={({isActive})=> isActive ? "text-red-600 border-red-600 border-b-4" : ""} to={`/${link}`}>{link}</NavLink></motion.li></SplideSlide>)}
                </Splide>
            </nav>
            <Outlet />
        </div>
    )
}


export default FetchData;