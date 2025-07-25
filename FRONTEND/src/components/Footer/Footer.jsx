
import FooterLogo from "../../assets/logo.png";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaLocationArrow,
    FaMobileAlt,
} from "react-icons/fa";
import NatureVid from "../../assets/video/footer2.mp4";
import { Link } from "react-router-dom";


const FooterLinks = [
    {
        title: "Home",
        link: "/",
    },
    {
        title: "About",
        link: "/about",
    },
    {
        title: "Best Places",
        link: "/best-places",
    },
    {
        title: "Blogs",
        link: "/blogs",
    },
];
const FooterLinks2 = [
    {
        title: "Traval Advisor",
        link: "/advisor",
    },
    {
        title: "Flight Booking",
        link: "/flight",
    },
    {
        title: "Trip Planning",
        link: "/tripplanner",
    },
];

const Footer = () => {
    return (
        <>
            <div className=" dark:bg-gray-950 py-10 relative overflow-hidden z-20 px-24">
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute right-0 top-0 h-full overflow-hidden w-full object-cover z-[-1]"
                >
                    <source src={NatureVid} type="video/mp4" />
                </video>
                <div className="container">
                    <div className="grid md:grid-cols-3 py-5 bg-white/80 backdrop-blur-sm rounded-t-xl">
                        <div className="py-8 px-4">
                            <h1 className="flex items-center gap-3 text-xl sm:text-3xl font-bold text-justify sm:text-left">
                                <img src={FooterLogo} alt="" className="max-h-[60px] bg-black" />
                                {/* TravelloGo */}
                            </h1>

                            <br />
                            <div className="flex items-center gap-3 ">
                                <FaLocationArrow />
                                <p>Mumbai, Maharashtra</p>
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                                <FaMobileAlt />
                                <p>+91 123456789</p>
                            </div>
                            {/* social handles */}
                            <div>
                                <div className="flex items-center gap-3 mt-6">
                                    <a href="#">
                                        <FaInstagram className="text-3xl" />
                                    </a>
                                    <a href="#">
                                        <FaFacebook className="text-3xl" />
                                    </a>
                                    <a href="#">
                                        <FaLinkedin className="text-3xl" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-2 col-span-2 md:pl-10">
                            <div>
                                <div className="py-8 px-4">
                                    <h1 className="text-xl font-bold text-justify sm:text-left mb-3">
                                        Menu
                                    </h1>
                                    <ul className="flex flex-col gap-3">
                                        {FooterLinks.map((link) => (
                                            <li
                                                key={link.title}
                                                className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-700 dark:text-gray-200">
                                                <Link
                                                    to={link.link}
                                                    onClick={() => window.scrollTo(0, 0)}
                                                >
                                                    <span>&#11162;</span>
                                                    <span>{link.title}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <div className="py-8 px-4">
                                    <h1 className="text-xl font-bold text-justify sm:text-left mb-3">
                                        Quick Links
                                    </h1>
                                    <ul className="flex flex-col gap-3">
                                        {FooterLinks2.map((link) => (
                                            <li
                                                key={link.title}
                                                className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-700 dark:text-gray-200">
                                                <Link
                                                    to={link.link}
                                                    onClick={() => window.scrollTo(0, 0)}
                                                >
                                                    <span>&#11162;</span>
                                                    <span>{link.title}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div>
                        <div className="text-center py-5 border-t-2 border-gray-300/50 bg-primary text-white">
                            @Copyright {new Date().getFullYear()} All rights reserved

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
