import React, {Component} from "react";
import {NavLink} from 'react-router-dom';
import {Navbar as BootstrapNav, Nav} from 'react-bootstrap';


class Navbar extends Component {
    state = {
        isOpen: false,
    };


    render() {
        return (
            <BootstrapNav variant="dark" className="indigo">
                <BootstrapNav.Brand href="/home">FIFA 20 Dashboard</BootstrapNav.Brand>
                <Nav className="mr-auto">
                    <NavLink to="/home" className="nav-link">Home</NavLink>
                    <NavLink to="/story" className="nav-link">Story</NavLink>
                </Nav>
            </BootstrapNav>
        );
    }
}

export default Navbar;