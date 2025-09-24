# build-electron.ps1

Write-Host "`n Compilando frontend (React + Vite)..."
Push-Location ./frontend

npm install
npm run build

Pop-Location

Write-Host "`n Limpiando carpeta dist antigua en Electron..."
Remove-Item -Recurse -Force ./electron/dist -ErrorAction SilentlyContinue

Write-Host "`n Copiando frontend compilado a Electron..."
Copy-Item -Recurse ./frontend/dist ./electron/

Write-Host "`n Construyendo ejecutable con electron-builder..."
Push-Location ./electron

npm install
npx electron-builder

Pop-Location

Write-Host "`n Proceso finalizado correctamente. El .exe se encuentra en: electron/dist/"
