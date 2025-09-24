// backend/db.js
import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

// Carpeta donde se almacenará la base de datos
const SERVER_FOLDER = process.env.VOLUNTARIOS_SERVER_PATH || path.resolve("C:/ServidorVoluntarios/data");

// Crear la carpeta si no existe
if (!fs.existsSync(SERVER_FOLDER)) {
  fs.mkdirSync(SERVER_FOLDER, { recursive: true });
}

// Ruta del archivo de base de datos
const DB_FILE = path.join(SERVER_FOLDER, "talento.db");

// Abrir/crear la base de datos
const db = new Database(DB_FILE);

// Crear tabla si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS voluntarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    apellido TEXT,
    cedula TEXT UNIQUE,
    telefono TEXT,
    direccion TEXT,
    estado TEXT,
    municipio TEXT,
    fecha_registro TEXT
  )
`).run();

// ---------------- FUNCIONES CRUD ----------------

// Crear voluntario
export function crearVoluntario(v) {
  const stmt = db.prepare(`
    INSERT INTO voluntarios (nombre, apellido, cedula, telefono, direccion, estado, municipio, fecha_registro)
    VALUES (@nombre, @apellido, @cedula, @telefono, @direccion, @estado, @municipio, @fecha_registro)
  `);
  return stmt.run({
    ...v,
    fecha_registro: new Date().toISOString()
  });
}

// Listar todos
export function listarVoluntarios() {
  return db.prepare(`SELECT * FROM voluntarios ORDER BY id DESC`).all();
}

// Buscar por cédula
export function buscarPorCedula(cedula) {
  return db.prepare(`SELECT * FROM voluntarios WHERE cedula = ?`).get(cedula);
}

// Actualizar voluntario
export function actualizarVoluntario(v) {
  const stmt = db.prepare(`
    UPDATE voluntarios SET nombre=@nombre, apellido=@apellido, telefono=@telefono,
    direccion=@direccion, estado=@estado, municipio=@municipio
    WHERE cedula=@cedula
  `);
  return stmt.run(v);
}

// Eliminar voluntario
export function eliminarPorCedula(cedula) {
  return db.prepare(`DELETE FROM voluntarios WHERE cedula = ?`).run(cedula);
}

// Export extra: path de la DB
export const dbFile = DB_FILE;
