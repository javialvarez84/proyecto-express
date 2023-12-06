const express = require('express');
const app = express();
const PORT = 3000;

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const validarMetodoHTTP = (req, res, next) => {
    const metodosValidos = ['GET', 'POST', 'PUT', 'DELETE'];

    if (!metodosValidos.includes(req.method)) {
        return res.status(400).send("Método HTTP no válido");
    }

    next();
};

const validarParametrosListView = (req, res, next) => {
    const { parametro1, parametro2 } = req.params;

    if (!parametro1 || !parametro2) {
        return res.status(400).send("Parámetros incorrectos");
    }

    next();
};

const gestionarErroresListEditRouter = (req, res, next) => {
    if (req.method === 'POST' && (!req.body || Object.keys(req.body).length === 0)) {
        return res.status(400).send("Cuerpo de la solicitud vacío en la solicitud POST");
    }

    if (req.method === 'POST' && (!req.body || !req.body.atributo1 || !req.body.atributo2)) {
        return res.status(400).send("Información no válida o atributos faltantes en la solicitud POST");
    }

    if (req.method === 'PUT' && (!req.body || Object.keys(req.body).length === 0)) {
        return res.status(400).send("Cuerpo de la solicitud vacío en la solicitud PUT");
    }

    if (req.method === 'PUT' && (!req.body || !req.body.atributo1 || !req.body.atributo2)) {
        return res.status(400).send("Información no válida o atributos faltantes en la solicitud PUT");
    }

    next();
};

app.use(validarMetodoHTTP);
app.use("/completas/:parametro1/:parametro2", validarParametrosListView, listViewRouter);
app.use("/incompletas/:parametro1/:parametro2", validarParametrosListView, listViewRouter);
app.use("/crear", gestionarErroresListEditRouter, listEditRouter);
app.use("/eliminar", gestionarErroresListEditRouter, listEditRouter);
app.use("/actualizar", gestionarErroresListEditRouter, listEditRouter);

const server = app.listen(PORT, () => {
    console.log(`Servidor Express funcionando en el puerto ${PORT}`);
});

module.exports = server;

