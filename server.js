const express = require('express');
const app = express();
const PORT = 3000;

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

app.use('/completas', listViewRouter);
app.use('/incompletas', listViewRouter);
app.use('/crear', listEditRouter);
app.use('/eliminar', listEditRouter);
app.use('/actualizar', listEditRouter);

const server = app.listen(PORT, () => {
  console.log(`Servidor Express funcionando en el puerto ${PORT}`);
});

module.exports = server;
