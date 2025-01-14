import { useState } from 'react';
import './chatbot.css';

const API_URL = import.meta.env.VITE_API_URL;




const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOrder, setIsOrder] = useState(false);
  const [orderData, setOrderData] = useState({
    userName: '',
    address: '',
    product: '',
  });

  const handleOrderSubmit = async (order) => {
  
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      const data = await response.json();
  
      const botMessage = {
        sender: 'bot',
        text: data.message || 'Tu pedido fue registrado exitosamente.',
      };
  
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch  {
      const botMessage = {
        sender: 'bot',
        text: 'Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo más tarde.',
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  
    setOrderData({ userName: '', address: '', product: '' });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.trim()) {
      const userMessage = { sender: 'user', text: input };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const inputLowerCase = input.toLowerCase();

      if (inputLowerCase.includes('pedir')) {
        setIsOrder(true);
        const botMessage = {
          sender: 'bot',
          text: 'Por favor, ingresa tu nombre para realizar el pedido.',
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else if (isOrder) {
        if (!orderData.userName) {
          const updatedOrderData = { ...orderData, userName: input };
          setOrderData(updatedOrderData);
      
          const botMessage = {
            sender: 'bot',
            text: 'Ingresa tu dirección.',
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        } else if (!orderData.address) {
          const updatedOrderData = { ...orderData, address: input };
          setOrderData(updatedOrderData);
      
          const botMessage = {
            sender: 'bot',
            text: 'Ingresa el producto que deseas.',
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        } else if (!orderData.product) {
          const updatedOrderData = { ...orderData, product: input }; 
          setOrderData(updatedOrderData); 
          
        
          await handleOrderSubmit(updatedOrderData); 
          setIsOrder(false);;
        }
      } else {
        const endpoint = inputLowerCase.includes('menu')
          ? 'menu/comida'
          : inputLowerCase.includes('estan abierto')
          ? 'faqs/status'
          : inputLowerCase.includes('ubicacion')
          ? 'chat/ubicacion'
          : (inputLowerCase.includes('ayuda') || inputLowerCase.includes('hola'))
          ? 'chat'
          : `menu/${encodeURIComponent(input.trim())}`;

        try {
          if (!endpoint) return;

          const response = await fetch(`${API_URL}/${endpoint}`);
          const data = await response.json();

          let botMessage = { sender: 'bot', text: '' };

          if (response.status === 403) {
            botMessage.text =
              data.message || 'Lo siento, no entiendo el mensaje, prueba nuevamente o escribe ayuda';
          } else if (endpoint === 'faqs/status') {
            botMessage.text = data.message || 'No pude encontrar el estado de apertura.';
          } else if (endpoint === 'chat/ubicacion') {
            botMessage.text = data && data.ubicacion ? `La ubicación es: ${data.ubicacion}` : 'No pude obtener la ubicación.';
          } else if (endpoint === 'chat') {
            if (Array.isArray(data)) {
              const chatCommands = data
                .map((item) => `- ${item.comand1}\n- ${item.comand2}\n- ${item.comand3}\n- ${item.comand4}\n- ${item.comand5}`)
                .join('\n\n');
              botMessage.text = `${data[0].title}\n\n${chatCommands}`;
            } else {
              botMessage.text = data.message || 'No pude obtener los comandos de ayuda.';
            }
          } else if (endpoint === 'menu/comida') {
            if (Array.isArray(data)) {
              const productNames = data.join('\n');
              botMessage.text = `${productNames}\n\nSi quieres ver un producto, escribe su nombre.`;
            } else {
              botMessage.text = 'No pude encontrar el menú.';
            }
          } else if (endpoint.startsWith('menu/')) {
            if (data && data.name) {
              botMessage.text = `Producto: ${data.name}\nDescripción: ${data.description}\nPrecio: $${data.price}`;
            } else {
              botMessage.text = data.message || 'Producto no encontrado.';
            }
          }

          setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch {
          const botMessage = {
            sender: 'bot',
            text: 'Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.',
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
      }
    } else {
      const botMessage = {
        sender: 'bot',
        text: 'No entendí tu mensaje. Si necesitas ayuda utiliza "ayuda".',
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }

    setInput('');
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
          placeholder={
            isOrder
              ? !orderData.userName
                ? 'Ingresa tu nombre'
                : !orderData.address
                ? 'Ingresa tu dirección'
                : !orderData.product
                ? 'Ingresa el producto'
                : 'Pedido completo. Enviando...'
              : 'Escribe un mensaje...'
          }
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Chat;

