// backend/index.js
import express from "express";
import cors from "cors";
import {
  crearVoluntario,
  listarVoluntarios,
  buscarPorCedula,
  actualizarVoluntario,
  eliminarPorCedula
} from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// ----------- ENDPOINTS ------------

// Crear voluntario
app.post("/voluntarios", (req, res) => {
  try {
    const result = crearVoluntario(req.body);
    res.json({ ok: true, lastInsertRowid: result.lastInsertRowid });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Listar voluntarios
app.get("/voluntarios", (req, res) => {
  try {
    const data = listarVoluntarios();
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Buscar por cédula
app.get("/voluntarios/:cedula", (req, res) => {
  try {
    const data = buscarPorCedula(req.params.cedula);
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Actualizar voluntario
app.put("/voluntarios/:cedula", (req, res) => {
  try {
    const result = actualizarVoluntario({ ...req.body, cedula: req.params.cedula });
    res.json({ ok: true, changes: result.changes });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Eliminar voluntario
app.delete("/voluntarios/:cedula", (req, res) => {
  try {
    const result = eliminarPorCedula(req.params.cedula);
    res.json({ ok: true, changes: result.changes });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// ----------- INICIAR SERVIDOR -----------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor de voluntarios escuchando en http://localhost:${PORT}`);
});
