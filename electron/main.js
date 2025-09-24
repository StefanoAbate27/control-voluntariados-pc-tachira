const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, "icon.ico"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // ✅ Ruta absoluta y segura con loadURL
  const indexPath = `file://${path.join(__dirname, "dist", "index.html").replace(/\\/g, "/")}`;
  mainWindow.loadURL(indexPath);

  // mainWindow.webContents.openDevTools(); // Opcional
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
