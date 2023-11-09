import {
    SiHtml5,
    SiJavascript,
    SiTailwindcss,
    SiReact,
    SiCsharp,
    SiLaravel,
    SiMysql,
    SiGit,
    SiMongodb
} from "react-icons/si"
import { motion, animate } from "framer-motion"
import { FadeContainer, popUp } from "../assets/FramerMotionVariants";
import { useTranslation } from "react-i18next";

const skills = [
    {
        name: "HTML",
        icon: SiHtml5
    },
    {
        name: "Javascript",
        icon: SiJavascript
    },
    {
        name: "TailwindCSS",
        icon: SiTailwindcss
    },
    {
        name: "React",
        icon: SiReact
    },
    {
        name: "C#",
        icon: SiCsharp
    },
    {
        name: "Laravel",
        icon: SiLaravel
    },
    {
        name: "MySQL",
        icon: SiMysql
    },
    {
        name: "MongoDB",
        icon: SiMongodb
    },
    {
        name: "Git",
        icon: SiGit
    },
];


/* Adds a hover animation to an element by setting its background and border image properties. */
function showHoverAnimation(e,) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top; //  y position within the element.
    
    e.target.style.background = `radial-gradient(circle at ${x}px ${y}px , rgba(255,255,255,0.2),rgba(255,255,255,0) )`;
    e.target.style.borderImage = `radial-gradient(20% 75% at ${x}px ${y}px ,rgba(255,255,255,0.7),rgba(255,255,255,0.1) ) 1 / 1px / 0px stretch `;
  }
  
  /* Removes the hover animation from an element by setting its background and border image properties to null. */
  export function removeHoverAnimation(e) {
    e.target.style.background = null;
    e.target.style.borderImage = null;
  }

export default function Skills() {
    const { t } = useTranslation();
    return(
    <section className=" md:mx-auto lg:mx-80" id="skills">
        <p className="text-4xl font-semibold text-gray-100 font-sarina">{t("mainSkills")}</p>
        <motion.div
            initial={animate && "hidden"}
            whileInView={animate ? "visible" : ""}
            variants={FadeContainer}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10"
        >
            {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                    <motion.div
                        initial={animate && "hidden"}
                        whileInView={animate ? "visible" : ""}
                        variants={popUp}
                        key={index}
                        title={skill.name}
                        onMouseMove={(e) =>
                            showHoverAnimation(e)
                        }
                        onMouseLeave={(e) =>
                            removeHoverAnimation(e)
                        }
                        className="flex flex-row items-center justify-center gap-4 p-4 origin-center transform border rounded-sm sm:justify-start bg-[#25282A]  hover:bg-white border-neutral-700 md:origin-top group"
                    >
                    <div className="relative transition pointer-events-none select-none group-hover:scale-110 sm:group-hover:scale-100">
                        <Icon className="w-8 h-8" fill="#747bff"/>
                    </div>
                    <p className="text-sm font-semibold pointer-events-none select-none sm:inline-flex md:text-base text-neutral-200">
                        {skill.name}
                    </p>
                    </motion.div>
                );
                })}
        </motion.div>
    </section>
    )
}