const express = require('express');
const router = express.Router();

const tareasCompletas = [
  { id: 1, titulo: "Completar informe", completada: true },
  { id: 2, titulo: "Revisar presentación", completada: true }
];

const tareasIncompletas = [
  { id: 3, titulo: "Preparar reunión", completada: false },
  { id: 4, titulo: "Enviar correos", completada: false }
];

router.get('/completas', (req, res) => {
  res.json(tareasCompletas);
});

router.get('/incompletas', (req, res) => {
  res.json(tareasIncompletas);
});

module.exports = router;
