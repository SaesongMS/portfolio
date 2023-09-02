/* Importing Modules */
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  FadeContainer,
  hamFastFadeContainer,
  mobileNavItemSideways,
  popUp,
} from "../assets/FramerMotionVariants";
import { NavLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
// import { useDarkMode } from "../context/darkModeContext";
// import { navigationRoutes } from "../utils/utils";
import Logo from "./Logo";
// import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTranslation } from "react-i18next";
import { t } from "i18next";



/* TopNavbar Component */
export default function TopNavbar() {
  const navRef = useRef(null);
  const navigationRoutes = [
    "home",
    "skills",
    "projects",
    "contact me",
  ];

  const { i18n, t } = useTranslation();

  /*  Using to control animation as I'll show the name to the mobile navbar when you scroll a bit
   * demo: https://i.imgur.com/5LKI5DY.gif
   */
  const control = useAnimation();
  const [navOpen, setNavOpen] = useState(false);
  const [translate, setTranslate] = useState(false);
  // const { isDarkMode, changeDarkMode } = useDarkMode();

  // Adding Shadow, backdrop to the navbar as user scroll the screen
  const addShadowToNavbar = useCallback(() => {
    if (window.scrollY > 10) {
      navRef.current.classList.add(
        ...[
          "shadow",
          "backdrop-blur-xl",
          "bg-[#25282A]"
        ]
      );

      control.start("visible");
    } else {
      navRef.current.classList.remove(
        ...[
          "shadow",
          "backdrop-blur-xl",
          "bg-[#25282A]",
        ]
      );
      control.start("hidden");
    }
  }, [control]);

  useEffect(() => {
    window.addEventListener("scroll", addShadowToNavbar);
    return () => {
      window.removeEventListener("scroll", addShadowToNavbar);
    };
  }, [addShadowToNavbar]);

  // to lock the scroll when mobile is open
  function lockScroll() {
    const root = document.getElementsByTagName("html")[0];
    root.classList.toggle("overflow-hidden");
    const main_section = document.getElementById("main");
    main_section?.classList.toggle("blur")
  }
  
  /* To Lock  the Scroll when user visit the mobile nav page */
  function handleClick() {
    lockScroll();
    setNavOpen(!navOpen);
  }

  // To change the language
  function changeLanguage() {
    i18n.changeLanguage(i18n.language === "en" ? "pl" : "en");
  }

  return (
    <div
      className="fixed w-full text-white top-0 flex items-center justify-between px-4 py-[10px] sm:px-6 z-50 print:hidden"
      ref={navRef}
      id="navbar"
    >
      {/* Mobile Navigation Hamburger and MobileMenu */}
      <HamBurger open={navOpen} handleClick={handleClick} />
      <AnimatePresence>
        {navOpen && (
          <MobileMenu links={navigationRoutes} handleClick={handleClick} />
        )}
      </AnimatePresence>

      <div href="/" className="mr-3" aria-label="Link to Home Page">
        <Logo className="relative hidden w-8 h-8 sm:inline-flex" />
        <div className="w-full sm:!hidden">
          <motion.p
            initial="hidden"
            animate={control}
            variants={{
              hidden: { opacity: 0, scale: 1, display: "none" },
              visible: { opacity: 1, scale: 1, display: "inline-flex" },
            }}
            className="font-sarina"
          >
          </motion.p>
        </div>
      </div>

      {/* Top Nav list */}
      <motion.nav className="z-10 hidden sm:flex md:inset-0 md:justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={FadeContainer}
          className="flex items-center md:gap-2"
        >
          {navigationRoutes.slice(0, 7).map((link, index) => {
            return <NavItem key={index} href={`${link}`} text={link} />;
          })}
        </motion.div>
      </motion.nav>

      {/* Language Container */}
      <motion.div
        // initial="hidden"
        // animate="visible"
        // variants={popUp}
        className="cursor-pointer mr-20 md:mr-32 lg:mr-40 xl:mr-2"
        title="Toggle Language"
      >
        {/* <DarkModeSwitch
          checked={isDarkMode}
          onChange={changeDarkMode}
          size={24}
        /> */}
        <button
          onClick={changeLanguage}
          className="font-semibold text-gray-100 p-2 rounded-md hover:bg-neutral-700/50"
        >
          EN/PL
        </button>
      </motion.div>
    </div>
  );
}

// NavItem Container
function NavItem({ href, text }) {
  const { t } = useTranslation();
  const isActive = useLocation() === (href === "/home" ? "/" : href);
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={popUp}
      className="cursor-pointer"
    >
      <HashLink
        className={`${
          isActive
            ? "font-bold text-gray-100"
            : "text-gray-300"
        } 
        sm:inline-block transition-all text-[17px] hidden px-2 md:px-3 py-[3px] hover:bg-neutral-700/50 rounded-md`}
        to={href === "home" ? "/#" : "/#"+href}
      >
        <motion.p className="" >
          {t("nav" + text.toUpperCase())}
        </motion.p>
      </HashLink>
    </motion.div>
  );
}

// Hamburger Button
function HamBurger({
  open,
  handleClick,
}) {
  return (
    <motion.div
      style={{ zIndex: 1000 }}
      initial="hidden"
      animate="visible"
      variants={popUp}
      className="sm:hidden"
    >
      {!open ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 duration-300 transform rounded-md cursor-pointer select-none active:scale-50"
          onClick={handleClick}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 duration-300 transform rounded-md cursor-pointer select-none active:scale-50"
          onClick={handleClick}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </motion.div>
  );
}

// Mobile navigation menu
const MobileMenu = ({
  links,
  handleClick,
}) => {
  return (
    <motion.div
      className="absolute top-0 left-0 z-10 w-screen h-screen font-normal bg-[#25282A] sm:hidden"
      variants={hamFastFadeContainer}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.nav className="flex flex-col mx-8 mt-14">
        {links.slice(0, 8).map((link, index) => {
          const navlink =
            link.toLowerCase() === "home" ? "/" : `/#${link.toLowerCase()}`;
          return (
            <HashLink
              // href={navlink}
              to={navlink}
              key={`mobileNav-${index}`}
              onClick={handleClick}
              className="flex w-auto py-4 text-base font-semibold capitalize border-b cursor-pointer border-gray-700 text-gray-100"
            >
              <motion.p variants={mobileNavItemSideways}>
                {t("nav" + link.toUpperCase())}
              </motion.p>
            </HashLink>
          );
        })}
      </motion.nav>
    </motion.div>
  );
};