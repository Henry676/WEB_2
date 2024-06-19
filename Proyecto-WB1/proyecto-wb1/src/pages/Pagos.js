// src/pages/Pagos.js
// src/pages/Pagos.js
import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button, Table, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { db } from '../pages/firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import Footer from "./Footer";

const Pagos = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: "", amount: "" });

    //const itemsCollectionRef = collection(db, "pagos");
    const itemsCollectionRef = collection(db, "historial");
    const historialCollectionRef = collection(db, "historial");

    useEffect(() => {
        const getItems = async () => {
            const data = await getDocs(itemsCollectionRef);
            setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getItems();
    }, []);

    const handleAddItem = async () => {
        if (newItem.name && newItem.amount) {
            await addDoc(itemsCollectionRef, { name: newItem.name, amount: parseFloat(newItem.amount) });
            await addDoc(historialCollectionRef, { name: `Pago: ${newItem.name}`, amount: parseFloat(newItem.amount), date: new Date() });
            setNewItem({ name: "", amount: "" });
            const data = await getDocs(itemsCollectionRef);
            setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
    };

    const handleAmountChange = async (id, newAmount) => {
        const itemDoc = doc(db, "pagos", id);
        await updateDoc(itemDoc, { amount: parseFloat(newAmount) });
        await addDoc(historialCollectionRef, { name: `Actualización de Pago`, amount: parseFloat(newAmount), date: new Date() });
        setItems(items.map((item) => (item.id === id ? { ...item, amount: parseFloat(newAmount) } : item)));
    };

    const total = items.reduce((acc, item) => acc + item.amount, 0);

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
                <h2>Mensajes y alertas de pago inminentes</h2>
                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>Pago</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>
                                    <Form.Control 
                                        type="number" 
                                        value={item.amount} 
                                        onChange={(e) => handleAmountChange(item.id, e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Form inline className="justify-content-center mt-3">
                    <Form.Control 
                        type="text" 
                        placeholder="Nuevo pago" 
                        value={newItem.name} 
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        className="mr-2"
                    />
                    <Form.Control 
                        type="number" 
                        placeholder="Monto" 
                        value={newItem.amount} 
                        onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
                        className="mr-2"
                    />
                    <Button onClick={handleAddItem}>Agregar</Button>
                </Form>
            </Container>
            <Navbar fixed="bottom" bg="light">
                <Container className="justify-content-end">
                    <Button variant="primary">Total: ${total}</Button>
                </Container>
                <Footer className="footer" />
            </Navbar>
        </div>
    );
};

export default Pagos;
