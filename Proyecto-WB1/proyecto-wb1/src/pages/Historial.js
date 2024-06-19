// src/pages/Historial.js
import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { db } from '../pages/firebase-config'; // Asegúrate de que esta ruta es correcta
import { collection, getDocs } from 'firebase/firestore';
import Footer from "./Footer";

const Historial = () => {
    const [items, setItems] = useState([]);

    const itemsCollectionRef = collection(db, "historial");

    useEffect(() => {
        const getItems = async () => {
            const data = await getDocs(itemsCollectionRef);
            const validItems = data.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }))
                .filter((item) => item.date); // Filtra los elementos que no tienen date
            setItems(validItems);
        };

        getItems();
    }, []);

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/">Regresar</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Container className="mt-5 text-center">
                <h2>Historial de gastos y pagos</h2>
                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>Descripción</th>
                            <th>Monto</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>${item.amount}</td>
                                <td>{new Date(item.date.seconds * 1000).toLocaleDateString("es-ES")}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
            <Footer className="footer" />
        </div>
    );
};

export default Historial;
