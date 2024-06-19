// src/pages/subPages/Alimentos.js
import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button, Table, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { db } from '../firebase-config'; // Asegúrate de que esta ruta es correcta
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

const Alimentos = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: "", price: "" });

    //const itemsCollectionRef = collection(db, "alimentos");
    const itemsCollectionRef = collection(db, "categorias", "gastos", "usuarios");
    const historialCollectionRef = collection(db, "historial");
    useEffect(() => {
        const getItems = async () => {
            const data = await getDocs(itemsCollectionRef);
            setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getItems();
    }, []);

    const handleAddItem = async () => {
        if (newItem.name && newItem.price) {
            await addDoc(itemsCollectionRef, { name: newItem.name, price: parseFloat(newItem.price) });
            await addDoc(historialCollectionRef, { name: `Alimento: ${newItem.name}`, amount: parseFloat(newItem.price), date: new Date() });
            setNewItem({ name: "", price: "" });
            const data = await getDocs(itemsCollectionRef);
            setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
    };

    const handlePriceChange = async (id, newPrice) => {
        const itemDoc = doc(db, "alimentos", id);
        await updateDoc(itemDoc, { price: parseFloat(newPrice) });
        await addDoc(historialCollectionRef, { name: `Actualización de Alimento`, amount: parseFloat(newPrice), date: new Date() });
        setItems(items.map((item) => (item.id === id ? { ...item, price: parseFloat(newPrice) } : item)));
    };

    const total = items.reduce((acc, item) => acc + item.price, 0);

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Regresar</Nav.Link>
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Container className="mt-5 text-center">
                <h2>Provisiones (canasta básica y precios)</h2>
                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>
                                    <Form.Control 
                                        type="number" 
                                        value={item.price} 
                                        onChange={(e) => handlePriceChange(item.id, e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Form inline className="justify-content-center mt-3">
                    <Form.Control 
                        type="text" 
                        placeholder="Nuevo producto" 
                        value={newItem.name} 
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        className="mr-2"
                    />
                    <Form.Control 
                        type="number" 
                        placeholder="Precio" 
                        value={newItem.price} 
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        className="mr-2"
                    />
                    <Button onClick={handleAddItem}>Agregar</Button>
                </Form>
            </Container>
            <Navbar fixed="bottom" bg="light">
                <Container className="justify-content-end">
                    <Button variant="primary">Total: ${total}</Button>
                </Container>
            </Navbar>
        </div>
    );
};

export default Alimentos;
