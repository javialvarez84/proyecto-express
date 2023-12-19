const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || 'secretkey';

const tasks = [
  { id: 1, description: 'Hacer las compras', completed: false },
  { id: 2, description: 'Preparar la cena', completed: true },
  { id: 3, description: 'Bañar al perro', completed:true },
  { id: 4, description: 'Ver al Madid', completed:true },
];

app.use(bodyParser.json());

const validarMetodoHTTP = (req, res, next) => {
  const metodosValidos = ['GET', 'POST', 'PUT', 'DELETE'];

  if (!metodosValidos.includes(req.method)) {
    return res.status(400).send('Método HTTP no válido');
  }

  next();
};

const validarParametrosListView = (req, res, next) => {
  const { parametro1, parametro2 } = req.params;

  if (!parametro1 || !parametro2) {
    return res.status(400).send('Parámetros incorrectos');
  }

  next();
};

const gestionarErroresListEditRouter = (req, res, next) => {
  if (req.method === 'POST' && (!req.body || Object.keys(req.body).length === 0)) {
    return res.status(400).send('Cuerpo de la solicitud vacío en la solicitud POST');
  }

  if (req.method === 'POST' && (!req.body || !req.body.atributo1 || !req.body.atributo2)) {
    return res.status(400).send('Información no válida o atributos faltantes en la solicitud POST');
  }

  if (req.method === 'PUT' && (!req.body || Object.keys(req.body).length === 0)) {
    return res.status(400).send('Cuerpo de la solicitud vacío en la solicitud PUT');
  }

  if (req.method === 'PUT' && (!req.body || !req.body.atributo1 || !req.body.atributo2)) {
    return res.status(400).send('Información no válida o atributos faltantes en la solicitud PUT');
  }

  next();
};


app.get('/tasks', (req, res) => {
  res.status(200).json({ tasks });
});


app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (task) {
    res.status(200).json({ task });
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});


app.post('/tasks', validarToken, (req, res) => {
  const newTask = req.body;

  if (!newTask.description) {
    return res.status(400).json({ error: 'La descripción de la tarea es obligatoria' });
  }

  newTask.id = tasks.length + 1;
  tasks.push(newTask);

  res.status(201).json({ createdTask: newTask });
});


app.put('/tasks/:id', validarToken, (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;

  const existingTask = tasks.find(t => t.id === taskId);

  if (existingTask) {
    existingTask.description = updatedTask.description || existingTask.description;
    existingTask.completed = updatedTask.completed || existingTask.completed;

    res.status(200).json({ updatedTask: existingTask });
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});

app.delete('/tasks/:id', validarToken, (req, res) => {
  const taskId = parseInt(req.params.id);

  const index = tasks.findIndex(t => t.id === taskId);

  if (index !== -1) {
    const deletedTask = tasks.splice(index, 1)[0];
    res.status(200).json({ deletedTask });
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});


const server = app.listen(PORT, () => {
  console.log(`Servidor Express funcionando en el puerto ${PORT}`);
});

module.exports = server;
