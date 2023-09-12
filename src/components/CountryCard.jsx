import { FcAutomotive } from "react-icons/fc";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const COMMON_CLASS = "flex items-center gap-3 my-2"
export default function CountryCard({area, car, name, flags, population, region, subregion, startOfWeek}) {
    return (
        <div className="p-3 shadow-md border-b-black border-b-2">
            <div className="flex item-center justify-between gap-3">
                <p className="font-semibold text-lg h-12 my-2">{name.official.toUpperCase()}</p>
                <p className="font-semibold text-md text-right my-2">{area}km<sup>2</sup></p>
            </div>
            <div className="w-full rounded-xl" >
                <LazyLoadImage src={flags.svg} alt="" className="w-full h-56 object-cover rounded-xl"/>
            </div>
            <div className={`${COMMON_CLASS}`}>
                <h1 className="text-md font-bold">NAME:</h1>
                <p className="font-semibold">{name.common}</p>
            </div>
            <div className={`${COMMON_CLASS}`}>
                <h1 className="text-md font-bold">POPULATION:</h1>
                <p className="font-semibold">{population}</p>
            </div>
            <div className={`${COMMON_CLASS}`}>
                <h1 className="text-md font-bold">REGION:</h1>
                <p className="font-semibold">{region}</p>
            </div>
            <div className={`${COMMON_CLASS}`}>
                <h1 className="text-md font-bold">SUB-REGION:</h1>
                <p className="font-semibold">{subregion}</p>
            </div>
            <div className={`${COMMON_CLASS}`}>
                <h1 className="text-md font-bold">START OF THE WEEK:</h1>
                <p className="font-semibold">{startOfWeek}</p>
            </div> 
            <p className="flex items-center gap-2 font-bold"> <FcAutomotive size={30}/>{car.side}</p>
            <Link to={`/country/${name.official}`} className="inline-block mr-auto text-lg font-bold bg-blue-600 hover:bg-blue-400 p-2 rounded-lg duration-[200ms]">VIEW MORE</Link>
        </div>
    )
}