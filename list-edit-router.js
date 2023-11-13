const express = require('express');
const router = express.Router();

const tareasParaEdicion = [
  { id: 1, titulo: "Completar informe", completada: true },
  { id: 2, titulo: "Revisar presentación", completada: true },
  { id: 3, titulo: "Preparar reunión", completada: false },
  { id: 4, titulo: "Enviar correos", completada: false }
];

router.post('/crear', (req, res) => {
  
});

router.delete('/eliminar/:id', (req, res) => {
  
});

router.put('/actualizar/:id', (req, res) => {
  
});

module.exports = router;