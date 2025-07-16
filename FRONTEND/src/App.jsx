import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import NoPage from './pages/NoPage';
import PlacesRoute from './pages/PlacesRoute';
import About from './pages/About'
import BlogsDetails from './pages/BlogsDetails';
import TripPlanner from './pages/TripPlanner';
import FlightComparison from './pages/FlightComparison';
import Login from './pages/Login'
import Register from './pages/Register'
import FlightListPage from './pages/FlightListPage';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import TravelAdvisor from './pages/TravelAdvisorPage';
import TravelAdvisorPage from './pages/TravelAdvisorPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
    <QueryClientProvider client={new QueryClient()}>
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
            <Route path="blogs/:id" element={<BlogsDetails />} />
            <Route path="best-places" element={<PlacesRoute />} />
            <Route path="/advisor" element={<TravelAdvisor />} />
            <Route path="*" element={<NoPage />} />
          </Route>
          <Route path="/travel-advisor" element={<TravelAdvisorPage />} />
        </Routes>
      </BrowserRouter >
    </QueryClientProvider>
  )
}

export default App