const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ajusta el nombre 'talento.db' si tu archivo tiene otro nombre o ruta
const dbPath = path.resolve(__dirname, 'talento.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos talento.db');
  }
});

module.exports = db;
