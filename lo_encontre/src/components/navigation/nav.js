import React from "react";
import { Nav, NavLink, NavMenu } from "./navBarElements";
import logo from "../images/logo.png"

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/logo">
                        <img src={logo} alt="logo" />
                    </NavLink>
                    <NavLink to="/home" >
                        Home
                    </NavLink>
                    <NavLink to="/about" >
                        About
                    </NavLink>
                    <NavLink to="/categories" >
                        Categories
                    </NavLink>
                    <NavLink to="/post_a_deal" >
                        Post a deal
                    </NavLink>
                    <NavLink to="/login" >
                        Login
                    </NavLink>
                    <NavLink to="/signup" >
                        Sign Up
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;