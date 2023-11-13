const express = require('express');
const app = express();
const PORT = 3000;

app.get('/tasks', (req, res) => {
  const tasks = [
    {
      id: "123456",
      isCompleted: false,
      description: "Bañar al perro"
    },
    {
      id: "789012",
      isCompleted: true,
      description: "Comprar papel higiénico"
    },
    {
      id: "345678",
      isCompleted: false,
      description: "Lavar la ropa"
    }
  ];
  res.json(tasks);
});

const server = app.listen(PORT, () => {
  console.log(`Servidor Express funcionando en el puerto ${PORT}`);
});

module.exports = server;
