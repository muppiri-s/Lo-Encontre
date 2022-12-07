import React from "react";
import { Link } from 'react-router-dom'
import { Nav, NavLink, NavMenu } from "./navBarElements";
import logo from "./images/logo.png"
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout"
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    let navigate = useNavigate();
    
    const handleClick = () => {
        logout()
        navigate('/logo');
    }

    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/logo">
                        <img src={logo} alt="logo" className="logo_resize" />
                    </NavLink>
                    <NavLink to="/home" >
                        Home
                    </NavLink>
                    <NavLink to="/about" >
                        About
                    </NavLink>
                    {
                        user != null &&
                        <NavLink to="/post_a_deal" >
                            Post a deal
                        </NavLink>
                    }
                    <NavLink>
                        {user && (
                            <div>
                                <span> {user.email} </span>
                                <button className="btn" onClick={handleClick}>Log out</button>
                            </div>
                        )}
                    </NavLink>
                    <NavLink>
                        {!user &&
                            <NavLink to="/login">Login</NavLink>
                        }
                    </NavLink>
                    <NavLink>
                        {!user &&

                            <Link to="/signup">Signup</Link>
                        }
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;