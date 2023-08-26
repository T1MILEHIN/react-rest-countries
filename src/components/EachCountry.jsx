import { FcAutomotive } from "react-icons/fc";
import { Link } from "react-router-dom";

const COMMON_CLASS = "flex items-center gap-3"
export default function EachCountry({area, car, name, flags, population, region, subregion, startOfWeek}){
    
    return (
        <div className="flex flex-wrap p-3 shadow-md border-b-black border-b-2">
            <img src={flags.png} alt="" className="w-full object-contain "/>
            <div>
                <div className="flex item-center justify-between gap-3">
                    <p className="font-semibold text-2xl">{name.official.toUpperCase()}</p>
                    <p className="font-semibold text-md text-right">{area}km<sup>2</sup></p>
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
                <Link to={`/all`} className="inline-block mr-auto text-lg font-bold bg-blue-600 hover:bg-blue-400 p-2 rounded-lg duration-[200ms]">GO BACK</Link>
            </div>
        </div>
    )
}