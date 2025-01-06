import React, { useState } from 'react';
import { checkIsOpen, fetchMenu, placeOrder } from '../services/api';

const Chatbot = () => {
  const [message, setMessage] = useState(''); // Mensaje que muestra el chatbot
  const [menuItems, setMenuItems] = useState([]); // Lista de menú

  const handleIsOpen = async () => {
    try {
      const response = await checkIsOpen();
      setMessage(response); // Muestra si está abierto o cerrado
    } catch (error) {
      setMessage('Error al verificar el estado');
    }
  };

  const handleMenu = async () => {
    try {
      const menu = await fetchMenu();
      setMenuItems(menu);
      setMessage('Aquí está nuestro menú:');
    } catch (error) {
      setMessage('Error al obtener el menú');
    }
  };

  const handleOrder = async () => {
    const name = prompt('Ingresa tu nombre');
    const address = prompt('Ingresa tu dirección');
    const product = prompt('Ingresa el nombre del producto que deseas pedir');

    try {
      const response = await placeOrder({ name, address, product });
      setMessage(response.message || 'Pedido realizado con éxito');
    } catch (error) {
      setMessage('Error al realizar el pedido');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Chatbot de Sushi</h1>
      <p>{message}</p>
      {menuItems.length > 0 && (
        <ul>
          {menuItems.map((item) => (
            <li key={item._id}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      )}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleIsOpen}>¿Está abierto?</button>
        <button onClick={handleMenu}>Menú</button>
        <button onClick={handleOrder}>Hacer un pedido</button>
      </div>
    </div>
  );
};

export default Chatbot;
