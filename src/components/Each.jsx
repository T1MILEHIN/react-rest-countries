import EachCountry from "./EachCountry"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Loader from "./Loader"

export default function Each() {
    const { name } = useParams()
    const api = `https://restcountries.com/v3.1/name/`
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchSingleCountry = async(one) => {
        const response = await fetch(`${api}${one}`)
        const jsondata = await response.json()
        setData(jsondata)
        setLoading(false)
    }
    useEffect(() => {
        setLoading(true)
        fetchSingleCountry(name);
    }, [])
    const country = data.map((country, index)=> <EachCountry key={index} {...country} />)
    return (
        <div className="min-h-screen flex gap-10 items-center justify-center">
            {loading ? <Loader /> : country}
        </div>
    )
}