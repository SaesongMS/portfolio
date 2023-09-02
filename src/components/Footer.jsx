import { navigationRoutes } from "./Navbar"
import { motion } from "framer-motion"
import { FadeContainer, popUp } from "../assets/FramerMotionVariants"
import { HashLink } from "react-router-hash-link"

export default function Footer() {
    return (
        <footer className="w-screen text-gray-400/50 mb-14 print:hidden">
            <motion.div
            initial="hidden"
            whileInView="visible"
            variants={FadeContainer}
            viewport={{ once: true }}
            className="flex flex-col max-w-4xl gap-5 p-5 mx-auto text-sm border-t-2 2xl:max-w-5xl 3xl:max-w-7xl border-gray-400/10 sm:text-base"
            >
                <section className="grid grid-cols-3 gap-10">
                    <div className="flex flex-col gap-4 capitalize">
                        {navigationRoutes.slice(0, 4).map((link, index) => {
                            const navlink =
                                link.toLowerCase() === "home" ? "/" : `/#${link.toLowerCase()}`;
                            return (
                                <HashLink
                                    to={navlink}
                                    key={`footerNav-${index}`}
                                    className="hover:text-gray-100"
                                >
                                    <motion.p
                                        className="hover:text-white w-fit text-gray-400/50" 
                                        variants={popUp}>
                                        {link}
                                    </motion.p>
                                </HashLink>
                            );
                        })}
                    </div>
                    <div className="flex flex-col gap-4 capitalize">
                        <a href="https://github.com/SaesongMS" >
                            <motion.p
                                className="hover:text-white w-fit text-gray-400/50" 
                                variants={popUp}>
                                GitHub
                            </motion.p>
                        </a>
                        <a href="https://www.linkedin.com/in/mateusz-st%C4%99gierski-025894289/">
                            <motion.p
                                className="hover:text-white w-fit text-gray-400/50" 
                                variants={popUp}>
                                LinkedIn
                            </motion.p>
                        </a>
                    </div>
                </section>
            </motion.div>
        </footer>
    )
}