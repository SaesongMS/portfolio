import { motion, animate } from "framer-motion";
import { FadeContainer, fromLeftChildren, fromLeftVariant, fromRightVariant } from "../assets/FramerMotionVariants";
import { BsGithub } from "react-icons/bs";
import { MdOutlineLink } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Projects() {

    const projects = [
        {
            name: "Project 1",
            description: "Description 1",
            image: "https://i.imgur.com/FSKQxDG.gif",
            stack: ["HTML", "CSS", "Javascript", "JQuery"],
        },
        {
            name: "Project 2",
            description: "Description 2",
            image: "https://i.imgur.com/FSKQxDG.gif",
            stack: ["C#", "Laravel", "MySQL"]
        },
        {
            name: "Project 3",
            description: "Description 3",
            image: "https://i.imgur.com/FSKQxDG.gif",
            stack: ["React", "TailwindCSS", "MongoDB", "Express", "NodeJS", "Mongoose"]
        },
        {
            name: "Project 4",
            description: "Description 4",
            image: "https://i.imgur.com/FSKQxDG.gif",
            stack: ["HTML", "CSS",],
        }
    ]

    return (
        <div className="md:mx-auto lg:mx-80 " id="projects">
            <p className="text-4xl font-semibold text-gray-100 font-sarina">Projects</p>
            <motion.div
            initial="hidden"
            whileInView="visible"
            variants={FadeContainer}
            className="grid grid-cols-1 gap-4 mx-auto md:ml-[20%] xl:ml-[24%]"
            transition={{ staggerChildren: 0.5 }}
            >
                {projects.map((project, index) => (
                    <Project key={index} project={project} index={index} />
                ))}
            </motion.div>
        </div>
    );
}

const Project = ({project, index}) => {
    return(
        <div className=" bg-[#25282A] p-5 sm:p-10 flex flex-col sm:flex-row nth-2n:sm:flex-row gap-8 items-center max-w-2xl shadow-md rounded-lg mt-[30%] sm:mt-8 transition-all">
            <Image key={index} src={project.image} alt={project.name} />
            <motion.div 
                className="flex flex-col justify-start gap-3"
                initial={animate && "hidden"}
                whileInView={animate ? "visible" : ""}
                variants={fromRightVariant}
            >
                <h1 className="font-bold text-neutral-900 dark:text-neutral-200">
                {project.name}
                </h1>
                <p className="text-sm text-gray-400 dark:text-neutral-400 line-clamp-5">
                {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-1">
                {project.stack.map((tool, index) => {
                    return (
                    <span
                        key={`${tool}-${index}`}
                        className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded dark:bg-darkPrimary"
                    >
                        {tool}
                    </span>
                    );
                })}
                </div>

                <div className="flex items-center gap-4 p-2 mt-auto w-fit">
                <NavLink
                    href={project.githubURL}
                    title="Source Code on GitHub"
                    className="text-gray-500 hover:text-black dark:hover:text-white"
                >
                    <BsGithub className="w-6 h-6 transition-all hover:scale-110 active:scale-90" />
                </NavLink>

                
                <NavLink
                href={project.previewURL}
                title="Live Preview"
                className="text-gray-500 hover:text-black dark:hover:text-white"
                >
                    <MdOutlineLink className="w-6 h-6 transition-all hover:scale-110 active:scale-90" />
                </NavLink>
                </div>
            </motion.div>
        </div>
    )
}

const Image = ({ src, alt }) => {
    return (
        <motion.div 
            className="relative -mt-[35%] sm:-mt-0 md:-ml-[35%] w-full sm:w-1/2 md:w-8/12 shrink-0 rounded-xl overflow-hidden shadow-2xl before:absolute before:inset-0 dark:before:bg-black/20 before:z-10"
            initial={animate && "hidden"}
            whileInView={animate ? "visible" : ""}
            variants={fromLeftVariant}>
          <img
            // variants={fromLeftVariant}
            title={alt}
            alt={alt}
            src={src}
            // width={1200}
            // height={630}
            placeholder="blur"
            // blurDataURL={src}
            // quality={25}
            className="transition-all duration-300 lg:group-hover:scale-110 backdrop-blur-xl w-max h-auto "
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
          />
        </motion.div>
      );
}