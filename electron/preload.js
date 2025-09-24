const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Aquí puedes exponer funciones personalizadas si lo necesitas
  ping: () => console.log('Preload funcionando 👌')
});
