import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import ForgetPassword from './pages/ForgetPassword.jsx'
import Profile from "./pages/Profile.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { Navbar } from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import PrivateRoute from "./components/routes/ProtectRoute.jsx";
import PublicRoute from "./components/routes/PublicRoute.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/user" element={<Profile />} />
          <Route path="/user/details" element={<Dashboard />} />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
