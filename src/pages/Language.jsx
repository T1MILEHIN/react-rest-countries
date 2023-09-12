import { useState } from "react"
import ErrorMessage from "../components/Error";
import SearchCountryData from "../components/searchCountry";
import Loader from "../components/Loader";
import SearchCountry from "../hooks/SearchCountry";

export default function Language() {
    const [lang, setLang] = useState('')
    const url = "https://restcountries.com/v3.1/lang/"
    const handleLanguage = (e)=> {
        setLang(e.target.value)
    }
    const {data: searchedCountry, error, isLoading} = SearchCountry(lang, url)
    if (error?.response?.data?.status === 404) error.message = `${lang} is not a valid Language`;
    const searchCountry = searchedCountry?.data.map((country, index)=> <SearchCountryData key={index} {...country}/>)
    return (
        <div className="overflow-x-hidden">
            <form action="" >
                <div className="px-2 lg:px-10 pt-2">
                    <input name="country_name" value={lang} onChange={handleLanguage} type="text" placeholder="Search by Language" className="w-full lg:w-[500px] pl-2 font-bold mb-2 block border-2 border-black h-10"/>
                </div>
            </form>
            {searchCountry && <p className="font-black text-lg lg:pl-10 pl-2">{searchCountry.length > 1 ? `${searchCountry.length} Results Found` : `${searchCountry.length} Result Found`}</p>}
            {isLoading ? <Loader /> : error && <ErrorMessage message={error.message} />}
            <div className="min-h-screen p-2 md:px-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
                {(!isLoading && !error) && searchCountry}
            </div>
        </div>
    )
}