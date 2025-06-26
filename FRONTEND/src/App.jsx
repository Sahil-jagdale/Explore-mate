import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import { About } from './pages/About';
import Blogs from './pages/Blogs';
import { Login } from './pages/Login';
import TripPlanner from './pages/TripPlanner';
import FlightComparison from './pages/FlightComparison';
import { Register } from './pages/Register';
import Home from './pages/Home';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

const App = () => {
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 900,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<Layout userdata={userdata} setUserdata={setUserdata} />}>
          <Route index element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="blogs" element={<Blogs />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="tripplanner" element={<TripPlanner />}></Route>
          <Route path="flight" element={<FlightComparison />}></Route>
          <Route path="register" element={<Register />}></Route>

        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App