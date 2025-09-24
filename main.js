
const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: { nodeIntegration: true }
  });
  win.loadURL('http://localhost:5173');
}

app.whenReady().then(() => {
  exec('cd backend && node index.js');
  exec('cd frontend && npm run dev');
  createWindow();
});
