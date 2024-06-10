import { NavLink } from 'react-router-dom';
import '../App.css';
import '../Styles/Navbar.css';
import { useAuth } from '../context/authContext';

export const Navbar = () => {
    const { token } = useAuth();

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-left">
                    <span className="sangam-text">WebApp</span>
                </div>
                <div className="navbar-right">
                    <NavLink to="/" className="active">Home</NavLink>
                    <NavLink to="/about" className="active">About</NavLink>
                   
                    {token ? (
                        <>
                            <NavLink to="/user/details" className="active">Profile</NavLink>
                            <NavLink to="/user" className="active">Dashboard</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="active">Login</NavLink>
                            <NavLink to="/forgetPassword" className="active">Forget Password</NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
