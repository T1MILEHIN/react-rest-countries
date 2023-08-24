import { useState } from "react"
import { motion } from "framer-motion";
import SearchCountryData from "../components/searchCountry"
import Nav from "../components/Nav"
import Loader from "../components/Loader";
export default function Currency() {
    const [currency, setCurrency] = useState('')
    const [country, setCountry] = useState([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const url = "https://restcountries.com/v3.1/currency/"
    const fetchCountry = async(currency) => {
        try {
            const response = await fetch(`${url}${currency}`)
            if (!response || !response.ok){
                throw new Error(`${currency} is not a valid Currency`);
            }
            if (!navigator.onLine) {
                setError('No internet connectivity.');
            }
            const data = await response.json()
            setCountry(data)
            setError(null);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error.message)
            setCountry([])
        }
    }
    const handleCurrency = (e)=> {
        setCurrency(e.target.value)
    }
    const findButton = (e)=> {
        e.preventDefault();
        setLoading(true)
        fetchCountry(currency)
    }
    const searchCountry = country.map((country, index)=> <SearchCountryData key={index} {...country}/>)
    return (
        <div className="overflow-x-hidden">
            <Nav />
            <form action="" onSubmit={findButton} >
                <div className="px-2 lg:px-10 lg:pt-10 pt-2">
                    <input name="country_name" value={currency} onChange={handleCurrency} type="text" placeholder="Search by Currency" className="w-full lg:w-[500px] pl-2 font-bold mb-2 block border-2 border-black h-10"/>
                    <button onClick={findButton} type="submit" className="font-bold p-2 rounded-lg bg-blue-400">SEARCH</button>
                </div>
            </form>
            {loading ? <Loader /> : error && <motion.p initial={{y:'-30px', opacity:0}} animate={{y:0, opacity:1}} className="font-extrabold text-center text-xl lg:text-4xl text-red-600">{error}</motion.p>}
            <div className="min-h-screen p-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
                {(!loading && !error) && searchCountry}
            </div>
        </div>
    )
}