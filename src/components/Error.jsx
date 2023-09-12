import { motion } from "framer-motion";

const ErrorMessage = (prop) => {
    return (
        <motion.p initial={{y:'-30px', opacity:0}} animate={{y:0, opacity:1}} className="font-extrabold text-center text-xl lg:text-4xl text-red-600">{prop.message}</motion.p>
    )
}

export default ErrorMessage;