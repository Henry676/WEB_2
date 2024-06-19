// src/components/Home.js
import React from "react";
import { getAuth, signOut } from 'firebase/auth';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { appFirebase } from '../pages/firebase-config'; // Asegúrate de que esta ruta es correcta
import Footer from "../pages/Footer";

const auth = getAuth(appFirebase);

const Home = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to="/pagos">Pagos</Nav.Link>
                            <Nav.Link as={Link} to="/categorias">Categorías</Nav.Link>
                            <Nav.Link as={Link} to="/historial">Historial</Nav.Link>
                            <Nav.Link as={Link} to="/" onClick={() => signOut(auth)}>Cerrar Sesión</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-5">
                <h2 className="text-center">Bienvenido</h2>
            </Container>
            <Footer className="footer" />
        </div>
    );
}

export default Home;
 