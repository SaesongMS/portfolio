import TopNavbar from "../components/Navbar";
import Skills from "../components/Skills";
import Introduction from "../components/Introduction";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import ScrollButton from "../components/ScrollButton";
import Footer from "../components/Footer";

export default function Home(){
    return (
        <div className="">
            <div className="bg-[#242424] w-full h-full fixed top-0 left-0 z-[-1]"></div> {/* Background for the whole page */}
            <TopNavbar />
            <div className="mt-20 md:mt-40 lg:mt-80" id="main">
                <Introduction />
                <Skills />
                <Projects />
                <Contact />
                <Footer />
            <ScrollButton />
            </div>
        </div>
    )
}