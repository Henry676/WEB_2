import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from "./Footer";

const Categorias = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                            <Nav.Link as={Link} to="/Servicio">Servicio</Nav.Link>
                            <Nav.Link as={Link} to="/Alimentos">Alimentos</Nav.Link>
                            <Nav.Link as={Link} to="/Transporte">Transporte</Nav.Link>
                            <Nav.Link as={Link} to="/Entretenimiento">Entretenimiento</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-5">
                <h2 className="text-center">Categorías</h2>
                <p className="text-center">Aquí puedes ver y administrar las diferentes categorías de servicios, alimentos, transporte y entretenimiento.</p>
                <Footer className="footer" />
            </Container>
        </div>
    );
};

export default Categorias;
