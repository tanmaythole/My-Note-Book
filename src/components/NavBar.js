import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
                <Navbar.Brand to="/">MyNoteBook</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/about">
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <div>
                        <Link to="/signup"><Button variant="outline-success">Signup</Button></Link>{' '}
                        <Link to="/login"><Button variant="success">Login</Button></Link>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar
