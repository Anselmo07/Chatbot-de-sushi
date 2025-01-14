# Chatbot de Sushi 🍣

Este es un proyecto de chatbot interactivo para un restaurante de sushi, donde los usuarios pueden consultar el menú, realizar pedidos y obtener información sobre el restaurante de forma automática.

## Instalación

Sigue estos pasos para instalar y correr el proyecto localmente:

1. **Clona este repositorio:**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_DIRECTORIO>
   ```

2. **Instala las dependencias:**
   Asegúrate de tener Node.js instalado, luego ejecuta:

   En la carpeta `frontend`:
   ```bash
   cd frontend
   npm install
   ```

   En la carpeta `backend`:
   ```bash
   cd backend
   npm install
   ```

3. **Configura las variables de entorno:**
   En ambas carpetas (`frontend` y `backend`), crea un archivo `.env` y define las siguientes variables:

   **Ejemplo en `frontend/.env`:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

   **Ejemplo en `backend/.env`:**
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<nombre_base_datos>?retryWrites=true&w=majority
   ```

4. **Ejecuta el proyecto:**

   En la carpeta `frontend`:
   ```bash
   npm run dev
   ```

   En la carpeta `backend`:
   ```bash
   npm start
   ```

   El frontend estará disponible en `http://localhost:5173` y el backend en `http://localhost:8080`.

## Ejemplos de Mensajes que Entiende el Bot

- **Consulta del menú:**

  - "Menu"

-**Detalle del producto (nombre del producto)**
  
  - "Uramaki"

- **Estado del restaurante:**

  - "Estan abiertos"

- **Ubicación del restaurante:**

  - "Ubicacion"

- **Pedidos:**

  - "Pedir"

- **Ayuda general:**

  - "Ayuda"
  - "Hola"

## Endpoints Disponibles

Los siguientes endpoints están configurados para manejar las solicitudes del chatbot:

- **`GET /menu/comida`**

  - Devuelve una lista de los productos disponibles en el menú.
  - **Ejemplo de Respuesta:**
    ```json
    [
      "Sushi de salmón",
      "Roll de atún",
      "Nigiri de camarón"
    ]
    ```

- **`GET /faqs/status`**

  - Devuelve el estado de apertura del restaurante.
  - **Ejemplo de Respuesta:**
    ```json
    {
      "message": "El restaurante está abierto de 11:00 a 20:00."
    }
    ```

- **`GET /chat/ubicacion`**

  - Proporciona la ubicación del restaurante.
  - **Ejemplo de Respuesta:**
    ```json
    {
      "ubicacion": "Av. Monte Caseros 240, Buenos Aires."
    }
    ```

- **`POST /orders`**

  - Registra un pedido.
  - **Cuerpo de la Solicitud:**
    ```json
    {
      "userName": "Juan Pérez",
      "address": "Calle Falsa 123",
      "product": "Sushi de salmón"
    }
    ```
  - **Ejemplo de Respuesta:**
    ```json
    {
      "message": "Pedido en proceso, en 15 minutos llega."
    }
    ```

## Tecnologías Utilizadas

- **React** para la interfaz de usuario.
- **Node.js** como entorno de ejecución.
- **CSS** para el diseño y estilos del chatbot.

## Contribuciones

Si deseas contribuir al proyecto, crea un fork del repositorio, realiza tus cambios y envía un pull request. ¡Gracias por tu apoyo!

---

Para cualquier duda o consulta, contáctanos en: [soporte@sushi-chatbot.com](mailto:soporte@sushi-chatbot.com)

