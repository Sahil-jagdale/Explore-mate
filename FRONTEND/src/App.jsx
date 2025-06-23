import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import { About } from './pages/About';
import Blogs from './pages/Blogs';
import { Login } from './pages/Login';
import TripPlanner from './pages/TripPlanner';
import FlightComparison from './pages/FlightComparison';
import { Register } from './pages/Register';
import Home from './pages/Home';
const App = () => {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="blogs" element={<Blogs />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="tripplanner" element={<TripPlanner />}></Route>
          <Route path="flight" element={<FlightComparison />}></Route>
          <Route path="register" element={<Register />}></Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App