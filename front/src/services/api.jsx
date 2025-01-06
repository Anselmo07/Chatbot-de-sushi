const BASE_URL = 'http://localhost:3000'; // Cambia por tu URL del backend

// Verifica si está abierto
export const checkIsOpen = async () => {
  const response = await fetch(`${BASE_URL}/faqs/status`);
  const data = await response.json();
  return data.message; // Respuesta del backend
};

// Obtiene el menú
export const fetchMenu = async () => {
  const response = await fetch(`${BASE_URL}/menu`);
  return response.json(); // Lista de menú
};

// Realiza un pedido
export const placeOrder = async (order) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  return response.json(); // Respuesta del backend
};
