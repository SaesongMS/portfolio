import TopNavbar from "../components/Navbar";
import Skills from "../components/Skills";
import Introduction from "../components/Introduction";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

export default function Home(){
    return (
        <div className="bg-[#242424]">
        <TopNavbar />
        <div className="mt-20 md:mt-40 lg:mt-80" id="main">
            {/*Introduction section*/}
            <Introduction />
            {/*Skills section*/}
            <Skills />
            {/*Projects section*/}
            <Projects />
            {/*Contact section*/}
            <Contact />
        </div>
        </div>
    )
}