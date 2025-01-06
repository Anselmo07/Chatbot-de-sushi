import { useState } from 'react';
import './chatbot.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInput('');

    let endpoint = '';
    let method = 'GET';

    if (input.toLowerCase().includes('pedir')) {
      endpoint = 'orders';
      method = 'POST';
    } else if (input.toLowerCase().includes('menu')) {
      endpoint = 'menu/comida';
    } else if (input.toLowerCase().includes('abierto')) {
      endpoint = 'faqs/status';
    } else if (input.toLowerCase().includes('ayuda')) {
      endpoint = "chat/ayuda";
    } else if (input.trim()) {
      // Aquí aplicamos la codificación de URL
      endpoint = `menu/${encodeURIComponent(input.trim())}`;  // Codifica correctamente el nombre
    } else {
      endpoint = '';
    }

    if (endpoint) {
      try {
        const options =
          method === 'POST'
            ? {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
              }
            : { method };

        const response = await fetch(`http://localhost:3000/${endpoint}`, options);
        const data = await response.json();

        let botMessage = { sender: 'bot', text: '' };

        if (response.status === 403) {
          botMessage.text =
            data.message || 'Lo siento, el negocio está cerrado. Solo abrimos de 11:00 a 15:00.';
        } else if (endpoint === 'orders') {
          botMessage.text = data.message || 'No pude procesar tu pedido.';
        } else if (endpoint === 'menu/comida') {
          if (Array.isArray(data)) {
            const productNames = data.join('\n');
            const botMessageText = `${productNames}\n\nSi quieres ver un producto, escribe su nombre.`;
            botMessage.text = botMessageText;
          } else {
            botMessage.text = 'No pude encontrar el menú.';
          }
        } else if (endpoint.startsWith('menu/')) {  // Respuesta cuando se consulta un producto específico
          if (data && data.name) {
            // Filtramos solo los campos necesarios
            const botMessageText = `Producto: ${data.name}\nDescripción: ${data.description}\nPrecio: $${data.price}`;
            botMessage.text = botMessageText;  // Mostrar solo nombre, descripción y precio
          } else {
            botMessage.text = data.message || 'Producto no encontrado.';
          }
        } else if (endpoint === 'faqs/status') {
          if (data && data.message) {
            botMessage.text = data.message;
          } else {
            botMessage.text = 'No pude encontrar las preguntas frecuentes.';
          }
        }

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        const botMessage = {
          sender: 'bot',
          text: 'Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.',
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } else {
      const botMessage = {
        sender: 'bot',
        text: 'No entendí tu mensaje. Si necesitas ayuda utiliza "ayuda".',
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  };

  return (
    <div className="chat-container">
      <h1>Chatbot de sushi 🍣</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <span style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Chat;





