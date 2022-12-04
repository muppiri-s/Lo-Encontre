import React from "react";
import { Nav, NavLink, NavMenu } from "./navBarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/logo">
                        <img src="./images/logo.jfif" alt="logo" />
                    </NavLink>
                    <NavLink to="/home" >
                        Home
                    </NavLink>
                    <NavLink to="/stores" >
                        Stores
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