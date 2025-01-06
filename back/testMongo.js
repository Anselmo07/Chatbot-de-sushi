const { MongoClient } = require('mongodb');

// Reemplaza con tu URL de conexión
const uri = "mongodb+srv://anselmo:chatbot@anselmo.2mlml.mongodb.net/?retryWrites=true&w=majority";

async function testConnection() {
  const client = new MongoClient(uri);

  try {
    // Intenta conectar
    await client.connect();
    console.log("Conexión exitosa a MongoDB");

    // Verifica las bases de datos disponibles
    const databases = await client.db().admin().listDatabases();
    console.log("Bases de datos disponibles:", databases.databases);
  } catch (error) {
    console.error("Error conectándose a MongoDB:", error);
  } finally {
    // Cierra la conexión
    await client.close();
  }
}

testConnection();
