import { motion } from "framer-motion";

export default function Greeting() {
    let date = new Date()
    let hour = date.getHours()
    let timeOfDay;

    if (hour < 12) {
        timeOfDay = 'Morning'
    }
    else if (hour >= 12 && hour < 17) {
        timeOfDay = 'Afternoon'
    }
    else {
        timeOfDay = 'Evening'
    }
    return (
        <>
            <motion.h1 initial={{scale: 0}} animate={{scale:1}} transition={{type: 'spring', stiffness: 200}} className="text-center font-bold text-4xl mt-20">Good {timeOfDay} !</motion.h1>
            <motion.p initial={{y:'-20px', opacity:0}} animate={{y:0, opacity:1}} transition={{type: 'spring', delay: 1}} className="text-center font-semibold text-md">Click the menu to start</motion.p>
        </>
    )

}