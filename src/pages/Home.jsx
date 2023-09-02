import TopNavbar from "../components/Navbar";
import Skills from "../components/Skills";
import Introduction from "../components/Introduction";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import ScrollButton from "../components/ScrollButton";
import Footer from "../components/Footer";

export default function Home(){
    return (
        <div className="bg-[#242424]">
            <TopNavbar />
            <div className="mt-20 md:mt-40 lg:mt-80 mx-5" id="main">
                <Introduction />
                <Skills />
                <Projects />
                <Contact />
                <Footer />
            </div>
            <ScrollButton />
        </div>
    )
}