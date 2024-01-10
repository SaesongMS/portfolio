import { motion, animate } from "framer-motion";
import { FadeContainer, fromLeftVariant, fromRightVariant } from "../assets/FramerMotionVariants";
import { BsGithub } from "react-icons/bs";
import { MdOutlineLink } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function Projects() {

    const { t } = useTranslation();

    const projects = [
        {
            name: t("project4Name"),
            description: t("project4Description"),
            image: "https://i.imgur.com/SF8pr0a.jpg",
            stack: ["ASP.NET", "C#", "HTML", "TailwindCSS", "Javascript", "SolidJS", "PostgreSQL"],
            // soon: true,
            githubURL: "https://github.com/SaesongMS/spotify-tracking-sns"
        },
        {
            name: t("project1Name"),
            description: t("project1Description"),
            image: "https://raw.githubusercontent.com/SaesongMS/spotify-api-training/main/public/home.JPG",
            stack: ["HTML", "TailwindCSS", "Javascript", "React"],
            githubURL: "https://github.com/SaesongMS/spotify-api-training",
            previewURL: "https://spotify-top-stats.netlify.app/"
        },
        {
            name: t("project2Name"),
            description: t("project2Description"),
            image: "https://raw.githubusercontent.com/SaesongMS/aspnet-react-mongo-docker-stack/main/examples/home.JPG",
            stack: ["ASP.NET", "C#", "HTML", "TailwindCSS", "Javascript", "React", "MongoDB"],
            githubURL: "https://github.com/SaesongMS/aspnet-react-mongo-docker-stack"
        },
        {
            name: t("project3Name"),
            description: t("project3Description"),
            image: "https://raw.githubusercontent.com/SaesongMS/laravel-restaurant/main/examples/reservation.JPG",
            stack: ["PHP", "Laravel", "HTML", "TailwindCSS", "MySQL"],
            githubURL: "https://github.com/SaesongMS/laravel-restaurant"
        },
        
    ]

    return (
        <section className="md:mx-auto lg:mx-80" id="projects">
            <p className="text-4xl font-semibold text-gray-100 font-sarina">{t("mainProjects")}</p>
            <motion.div
            initial="hidden"
            whileInView="visible"
            variants={FadeContainer}
            className="flex flex-col items-center md:ml-20 gap-4"
            transition={{ staggerChildren: 0.5 }}
            >
                {projects.map((project, index) => (
                    <Project key={index} project={project} index={index} />
                ))}
            </motion.div>
        </section>
    );
}

const Project = ({project, index}) => {
    const { t } = useTranslation();
    return(
        <div className=" bg-[#25282A] p-5 sm:p-10 flex flex-col sm:flex-row nth-2n:sm:flex-row gap-8 items-center max-w-2xl shadow-md rounded-lg mt-[30%] sm:mt-8 transition-all">
            <Image key={index} src={project.image} alt={project.name} />
            <motion.div 
                className="flex flex-col justify-start gap-3"
                initial={animate && "hidden"}
                whileInView={animate ? "visible" : ""}
                variants={fromRightVariant}
            >
                <h1 className="font-bold text-neutral-200">
                {project.name}
                </h1>
                <p className="text-sm text-neutral-400">
                {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-1">
                {project.stack.map((tool, index) => {
                    return (
                    <span
                        key={`${tool}-${index}`}
                        className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded"
                    >
                        {tool}
                    </span>
                    );
                })}
                </div>

                <div className="flex items-center gap-4 p-2 mt-auto w-fit">
                {project.githubURL && <a
                    href={project.githubURL}
                    title="Source Code on GitHub"
                    className="text-gray-500 hover:text-white"
                >
                    <div className="transition-all hover:scale-110 active:scale-90">
                        <BsGithub className="w-6 h-6 transition-all hover:scale-110 active:scale-90" />
                    </div>
                </a>}
                

                
                {project.previewURL && <a
                href={project.previewURL}
                title="Live Preview"
                className="text-gray-500 hover:text-white"
                >
                    <div className="transition-all hover:scale-110 active:scale-90">
                        <MdOutlineLink className="w-6 h-6 transition-all hover:scale-110 active:scale-90" />
                    </div>
                </a>}
                {project.soon && <div className="text-gray-500 hover:text-white">
                    <div className="transition-all hover:scale-110 active:scale-90">
                        <p className="font-semibold text-sm">{t("projectSoon")}</p>
                    </div>
                    </div>}
                </div>
            </motion.div>
        </div>
    )
}

const Image = ({ src, alt }) => {
    return (
        <motion.div 
            className="relative -mt-[35%] sm:-mt-0 md:-ml-[35%] w-full sm:w-1/2 md:w-8/12 shrink-0 rounded-xl overflow-hidden shadow-2xl before:absolute before:inset-0  before:z-10" /*dark:before:bg-black/20 */
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