import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const SearchCountry = (search, url)=> {
    return useQuery({
        queryKey: ["search", search],
        queryFn: ({queryKey})=> {
            if (!queryKey[1] || queryKey[1] === "") return null;
            return axios.get(`${url}${queryKey[1]}`)
        },
        retry: false,
    })
}

export default SearchCountry;