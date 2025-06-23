import { useState } from 'react';
import NatureVid from '../assets/video/flight_vid.mp4'
import Hero from '../components/Hero/Hero'
import Places from "../components/Places/Places";

const Home = () => {
    const [orderPopup, setOrderPopup] = useState(false);

    const handleOrderPopup = () => {
        setOrderPopup(!orderPopup);
    };
    return (
        <>
            <div className="h-[700px] relative">
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute right-0 top-0 h-[700px] w-full object-cover z-[-1]"
                >
                    <source src={NatureVid} type="video/mp4" />
                </video>
                <Hero />
            </div>
            <Places handleOrderPopup={handleOrderPopup} />
        </>
    )
}

export default Home