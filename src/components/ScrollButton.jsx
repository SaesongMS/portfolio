import { useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";


export default function ScrollButton() {
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setShowScroll(true);
        } else if (scrolled <= 300) {
            setShowScroll(false);
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", checkScrollTop);

    return (
        <BsFillArrowUpCircleFill
            className={`fixed bottom-10 right-10 w-14 h-14 z-50 cursor-pointer mr-7 md:mr-0  ${showScroll ? "inline" : "hidden"}`}
            onClick={scrollTop}
        />
    );

}