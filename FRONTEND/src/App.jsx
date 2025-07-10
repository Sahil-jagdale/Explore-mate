import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import About from './pages/About'
import Blogs from './pages/Blogs';
import TripPlanner from './pages/TripPlanner';
import FlightComparison from './pages/FlightComparison';
import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register'
import FlightListPage from './pages/FlightListPage';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import PlacesRoute from './pages/PlacesRoute';
import NoPage from './pages/NoPage';
import TravelAdvisor from './pages/TravelAdvisorPage';

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
          <Route path="register" element={<Register />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="tripplanner" element={<TripPlanner />}></Route>
          <Route path="flight" element={<FlightComparison />}></Route>
          <Route path="/flights" element={<FlightListPage />} />
          <Route path="best-places" element={<PlacesRoute />} />
          <Route path="/advisor" element={<TravelAdvisor />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App