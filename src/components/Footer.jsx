import { navigationRoutes } from "./Navbar"
import { motion } from "framer-motion"
import { FadeContainer, popUp } from "../assets/FramerMotionVariants"
import { useEffect, useState } from "react"
import { SiSpotify } from "react-icons/si"
import { HashLink } from "react-router-hash-link";

const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

const getAccessToken = async () => {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${client_id}:${client_secret}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
      }),
      json: true
    });
    const data = await response.json();
    return data;
};

const currentlyPlayingSong = async () => {
    const { access_token } = await getAccessToken();
  
    const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    const data = await response.json();
    return data;
};

async function fetcher(url) {
    return fetch(url).then((r) => r.json());
  }

export default function Footer() {

    const [currentSong, setCurrentSong] = useState(null);

    useEffect(() => {
        const interval = setInterval(async () => {
            const response = await currentlyPlayingSong();
            setCurrentSong(response);
        }, 5000);
    
        return () => clearInterval(interval);
      }, []);

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
                    <div>
                        {currentSong ? <Song song={currentSong.item} /> : <NoPlayingSong />}
                    </div>
                </section>
            </motion.div>
        </footer>
    )
}

function Song({song}){
    return (
        <div className="flex flex-col">
          <a
            href={song.album.external_urls.spotify}
            className="flex flex-col md:flex-row items-center justify-between p-3 rounded-sm bg-[#25282A] sm:p-4 text-center md:text-start"
          >
            <div className="flex flex-col md:flex-row items-center gap-2 ">
              <div className="w-10 h-10">
                <img
                  alt={song.name}
                  src={song.album.images[0].url}
                  width={40}
                  height={40}
                  quality={50}
                  placeholder="blur"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold  md:text-lg text-white animate-">
                  {song.name}
                </h3>
                <p className="text-xs  text-gray-400 sm:text-sm">
                  {song.artists[0].name}
                </p>
              </div>
            </div>
            <div className="items-center mt-2">
              <SiSpotify className="w-6 h-6 text-green-500 animate-[spin_2s_linear_infinite]" />
            </div>
          </a>
        </div>
      );
}

function NoPlayingSong(){
    return (
        <div className="flex flex-row-reverse items-center justify-between gap-2 sm:flex-row sm:justify-start">
            <SiSpotify className="w-6 h-6" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <div className="font-semibold text-black md:text-lg dark:text-white">
                Not Playing
            </div>
            <span className="hidden md:inline-flex">—</span>
            <p className="text-xs text-gray-500 sm:text-sm">Spotify</p>
            </div>
        </div>
    );
}