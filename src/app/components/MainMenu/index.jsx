import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MainMenu() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/" className="btn btn-link">Home</Link>
                    <Link to="/signup" className="btn btn-link">Sign Up</Link>
                    <Link to="/login" className="btn btn-link">Login</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MainMenu;