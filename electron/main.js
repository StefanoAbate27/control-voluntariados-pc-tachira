const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') // Opcional si usas preload
    },
    icon: path.join(__dirname, 'icon.ico')
  });

  if (app.isPackaged) {
    // Producción: carga el index.html ya compilado
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    // Desarrollo: abre la URL de Vite
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools(); // Quitar si no quieres que abra la consola
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
