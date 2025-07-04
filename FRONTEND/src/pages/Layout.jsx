import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import OrderPopup from "../components/OrderPopup/OrderPopup";
import { useState } from 'react';
import Footer from '../components/Footer/Footer';

const Layout = ({ userdata, setUserdata }) => {
    const [orderPopup, setOrderPopup] = useState(false);
    const handleOrderPopup = () => {
        setOrderPopup(!orderPopup);
    };

    return (
        <div>
            <Navbar userdata={userdata} setUserdata={setUserdata} handleOrderPopup={handleOrderPopup} />
            <Outlet context={{ setUserdata }} />
            <Footer />
            <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
        </div>
    )
}

export default Layout