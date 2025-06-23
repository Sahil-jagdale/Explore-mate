import { useState, useEffect } from "react";
import Logo from "../../assets/logo.png";
import { NavLink, Link, Navigate, useNavigate } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import ResponsiveMenu from "./ResponsiveMenu";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";

export const NavbarLinks = [
    {
        name: "Home",
        link: "/",
    },

    {
        name: "Explore",
        link: "/advisor",
    },
    {
        name: "FlightFare",
        link: "/flight",
    },
    {
        name: "Itinerary",
        link: "/itinerary",
    },
];

const DropdownLinks = [
    {
        name: "About",
        link: "/about",
    },
    {
        name: "Blogs",
        link: "/blogs",
    },
    {
        name: "Best Places",
        link: "/best-places",
    },
];





const Navbar = ({ userdata, setUserdata, handleOrderPopup }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedOut, setLoggedOut] = useState(false);

    const navigate = useNavigate();

    // localStorage.setItem("user", JSON.stringify(res.data));

    useEffect(() => {
        setIsLoggedIn(!userdata);
    }, [userdata]);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleDropdownLinkClick = (link) => {
        navigate(link);
        setShowMenu(false);
    }

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUserdata(null);
        setIsLoggedIn(false);
        setLoggedOut(true);
        // Redirect to home page after logout
        window.location.href = "/";
    };
    return (
        <>
            <nav className="fixed top-0 right-0 w-full z-50 bg-[#14347e] backdrop-blur-sm text-white text-lg font-semibold shadow-md">
                <div className="container py-3 sm:py-0">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 font-bold text-2xl">
                            <Link to={"/"} onClick={() => window.scrollTo(0, 0)}>
                                <img src={Logo} alt="" className="h-12" />
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <ul className="flex items-center gap-6 ">
                                {NavbarLinks.map((link) => (
                                    <li key={link.name} className="py-4">
                                        <NavLink to={link.link} activeClassName="active">
                                            {link.name}
                                        </NavLink>
                                    </li>
                                ))}
                                <li className="group relative cursor-pointer">
                                    <a
                                        href="/#home"
                                        className="flex h-[72px] items-center gap-[2px]"
                                    >
                                        Quick Links{" "}
                                        <span>
                                            <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                                        </span>
                                    </a>
                                    <div className="absolute -left-9 z-[9999] hidden w-[150px] rounded-md bg-white p-2 text-black group-hover:block shadow-md ">
                                        <ul className="space-y-3">
                                            {DropdownLinks.map((data) => (
                                                <li key={data.name}>
                                                    <a
                                                        className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                                                        href={data.link}
                                                        onClick={() => handleDropdownLinkClick(data.link)}
                                                    >
                                                        {data.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                                <li className="py-4"></li>
                            </ul>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="bg-gradient-to-r from-primary to-secondary hover:bg-bg-gradient-to-r hover:from-secondary hover:bg-primary transition-all duration-600 text-white px-3 py-1 rounded-full">
                                {userdata && !loggedOut ? (
                                    <button onClick={handleLogout}>Logout</button>
                                ) : (

                                    <NavLink to="/login" activeClassName="active">
                                        Login/Signup
                                    </NavLink>


                                )}
                            </button>
                            <div className="md:hidden block">
                                {showMenu ? (
                                    <HiMenuAlt1
                                        onClick={toggleMenu}
                                        className="cursor-pointer transition-all"
                                        size={30}
                                    />
                                ) : (
                                    <HiMenuAlt3
                                        onClick={toggleMenu}
                                        className="cursor-pointer transition-all"
                                        size={30}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <ResponsiveMenu setShowMenu={setShowMenu} showMenu={showMenu} />
            </nav>
        </>
    );
};

export default Navbar;