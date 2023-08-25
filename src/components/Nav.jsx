import { NavLink, Outlet } from "react-router-dom";
import { FaBars, FaXing } from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navVariant = {
    first: {
        scale: 0,
    },
    last: {
        scale: 1,
        transition: {
            type: 'linear', duration: 0.2, staggerChildren: 0.1 , when: 'beforeChildren'
        }
    }
}

const linkVariant = {
    first: {
        y: '-30px',
        opacity: 0,
    },
    last: {
        y: 0,
        opacity: 1
    },
}

export default function Nav() {
    const [toggle, setToggle] = useState(false);
    const toggleMenu = ()=> {
        setToggle(prev => !prev)
    }
    return (
        <>
            <div className="relative">
                <AnimatePresence>
                    <motion.nav variants={navVariant} animate={toggle && "last"} className={`${toggle ? "flex" : "hidden"} duration-30 h-fit absolute flex-col left-0 right-0 top-10 bg-black bg-opacity-70 md:bg-transparent text-center md:static lg:p-10 p-2 md:flex md:flex-row justify-between items-center pt-2 text-black overflow-x-hidden`}>
                        <motion.p variants={linkVariant} whileHover={{scale: 1.1}} whileTap={{scale:0.9}} className="font-extrabold text-lg md:opacity-100">
                            <NavLink className={({isActive})=> isActive ? "text-red-600" : "text-black"} to={"/"}>Search by Name</NavLink>
                        </motion.p>
                        <motion.p variants={linkVariant} whileHover={{scale: 1.1}} whileTap={{scale:0.9}} className="font-extrabold text-lg md:opacity-100">
                            <NavLink className={({isActive})=> isActive ? "text-red-600" : "text-black"} to={"/currency"}>Search by Currency</NavLink>
                        </motion.p>
                        <motion.p variants={linkVariant} whileHover={{scale: 1.1}} whileTap={{scale:0.9}} className="font-extrabold text-lg md:opacity-100">
                            <NavLink className={({isActive})=> isActive ? "text-red-600" : "text-black"} to={"/capital"}>Search by Capital</NavLink>
                        </motion.p>
                        <motion.p variants={linkVariant} whileHover={{scale: 1.1}} whileTap={{scale:0.9}} className="font-extrabold text-lg md:opacity-100">
                            <NavLink className={({isActive})=> isActive ? "text-red-600" : "text-black"} to={"/language"}>Search by Language</NavLink>
                        </motion.p>
                    </motion.nav>
                </AnimatePresence>
                {toggle ? <FaXing className="m-2 md:hidden ml-auto" onClick={toggleMenu} size={35}/> : <FaBars className="m-2 md:hidden ml-auto" size={35} onClick={toggleMenu} />}
            </div>
            <Outlet />
        </>
    );
}