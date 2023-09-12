import { FcAutomotive } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const COMMON_CLASS = "flex items-center gap-3 my-2";

const countryVariant = {
    first: {
        y: '70px',
        opacity: 0,
    },
    last: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring', stiffness: 200, duration: 0.3, staggerChildren: 0.3, when: "beforeChildren",
        }
    },
    exit: {
        x: '100px',
        opacity: 0
    }
}

const childrenVariant = {
    first: {
        opacity: 0,
        x: '100px',
    },
    last: {
        opacity: 1,
        x: 0,
    }
}

export default function SearchCountryData({name, area, car, capital, coatOfArms, population, region, subregion, startOfWeek, flags}) {
    return (
        <AnimatePresence>
            <motion.div variants={countryVariant} initial="first" animate="last" exit="exit" className="p-2 h-fit md:h-auto lg:p-3 shadow-lg border-b-black border-b-2 border-2 rounded-t-xl">
                <motion.div variants={childrenVariant} className="flex item-center justify-between gap-3">
                    <p className="font-semibold text-lg h-12 my-2">{name.official.toUpperCase()}</p>
                    <p className="font-semibold text-md text-right my-2">{area}km<sup>2</sup></p>
                </motion.div>
                <motion.div variants={childrenVariant} className="w-full rounded-xl" >
                    <LazyLoadImage effect="blur" src={flags.svg} alt="" className="w-full h-56 object-cover rounded-xl"/>
                </motion.div>
                <motion.div variants={childrenVariant} className={`${COMMON_CLASS} justify-between`}>
                    <motion.div variants={childrenVariant} className="flex items-center gap-3">
                        <h1 className="text-md font-bold">NAME:</h1>
                        <p className="font-semibold">{name.common}</p>
                    </motion.div>
                    <motion.img initial={{opacity:0}} animate={{opacity:1}} variants={childrenVariant} className="w-10" src={coatOfArms.png} alt="" />
                </motion.div>
                <motion.div variants={childrenVariant} className={`${COMMON_CLASS}`}>
                    <h1 className="text-md font-bold">CAPITAL:</h1>
                    <p className="font-semibold">{capital}</p>
                </motion.div>
                <motion.div variants={childrenVariant} className={`${COMMON_CLASS}`}>
                    <h1 className="text-md font-bold">POPULATION:</h1>
                    <p className="font-semibold">{population}</p>
                </motion.div>
                <motion.div variants={childrenVariant} className={`${COMMON_CLASS}`}>
                    <h1 className="text-md font-bold">REGION:</h1>
                    <p className="font-semibold">{region}</p>
                </motion.div>
                <motion.div variants={childrenVariant} className={`${COMMON_CLASS}`}>
                    <h1 className="text-md font-bold">SUB-REGION:</h1>
                    <p className="font-semibold">{subregion}</p>
                </motion.div>
                <motion.div variants={childrenVariant} className={`${COMMON_CLASS}`}>
                    <h1 className="text-md font-bold">START OF THE WEEK:</h1>
                    <p className="font-semibold">{startOfWeek}</p>
                </motion.div>
                <motion.p variants={childrenVariant} className="flex items-center gap-2 font-bold"> <FcAutomotive size={30}/>{car.side}</motion.p>
            </motion.div>
        </AnimatePresence>
    )
}