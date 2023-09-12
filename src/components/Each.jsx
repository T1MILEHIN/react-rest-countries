import EachCountry from "./EachCountry";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import FetchSingleCountry from "../hooks/FetchSingleCountry";
export default function Each() {
    const { name } = useParams()
    
    const {data:singleCountry, isLoading} = FetchSingleCountry(name)
    
    const country = singleCountry?.data.map((country, index)=> <EachCountry key={index} {...country} />)
    return (
        <div className="min-h-screen flex gap-10 items-center justify-center">
            {isLoading ? <Loader /> : country}
        </div>
    )
}