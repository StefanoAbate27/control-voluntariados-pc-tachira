const express = require('express');
const db = require('./db');

const app = express();

app.use(express.json());

// Endpoint para obtener todos los voluntarios
app.get('/voluntarios', (req, res) => {
  const sql = 'SELECT * FROM voluntarios';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Endpoint para insertar un voluntario
app.post('/voluntarios', (req, res) => {
  const { nombre, cedula, fecha_nacimiento, sexo, estado, municipio, telefono, correo, direccion, fecha_ingreso } = req.body;
  const sql = `
    INSERT INTO voluntarios 
      (nombre, cedula, fecha_nacimiento, sexo, estado, municipio, telefono, correo, direccion, fecha_ingreso)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [nombre, cedula, fecha_nacimiento, sexo, estado, municipio, telefono, correo, direccion, fecha_ingreso];

  db.run(sql, params, function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
