import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const api = 'https://restcountries.com/v3.1/all';
const FetchAllCountries = ()=> {
    return useQuery({
        queryKey:["all-countries"],
        queryFn: ()=> axios.get(api),
    })
}

export default FetchAllCountries;