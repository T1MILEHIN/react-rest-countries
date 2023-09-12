import { motion } from "framer-motion";
import ErrorMessage from "./Error";
import CountryCard from "./CountryCard";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import FetchAllCountries from "../hooks/FetchAllCountries";

export default function FilterCountry() {
    const {filter} = useParams();
    const {data: filteredData, isLoading, error} = FetchAllCountries()

    const countries = filteredData?.data?.map((country, index)=> < CountryCard key={index} index={index} {...country}/>)
    const filtered = filteredData?.data?.filter((country)=> (country.region) === filter).map((country, index)=> <CountryCard key={index} index={index} {...country}/>)
    const ALL = filter === "all" ? countries : filtered

    return (
        <>
            {error && <ErrorMessage message={error.message} /> }
            {!isLoading && !error && <motion.p initial={{scale: 0.5}} animate={{scale: 1.1}} exit={{scale: 0.5}} className="text-center font-bold text-xl md-text-4xl">{ALL.length} countries</motion.p>}
            <div className="p-2 md:p-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
                {isLoading ? <div className="col-span-6"><Loader/></div> : ALL}
            </div>
        </>
    )
}