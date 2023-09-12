import { useQuery } from "@tanstack/react-query"
import axios from "axios"


const FetchSingleCountry = (countryName)=> {
    const url = `https://restcountries.com/v3.1/name/`
    return useQuery({
        queryKey: ["single-country", countryName],
        queryFn: ()=> axios.get(`${url}${countryName}`)
    })
}

export default FetchSingleCountry;