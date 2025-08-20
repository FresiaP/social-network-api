@echo off
REM --------------------------------------
REM 1️⃣ Iniciar MongoDB en una nueva ventana
REM --------------------------------------
cd /d "C:\Program Files\MongoDB\Server\8.0\bin"

start "MongoDB Server" cmd.exe /k "mongod.exe --dbpath C:/data/db"

REM --------------------------------------
REM 2️⃣ Esperar a que MongoDB esté listo
REM --------------------------------------
echo Esperando a que MongoDB inicie...
:checkMongo
REM Intentar conectarse a MongoDB usando el cliente mongo.exe
"C:\Program Files\MongoDB\Server\8.0\bin\mongo.exe" --eval "quit()" > nul 2>&1
IF ERRORLEVEL 1 (
    REM Si no está listo, esperar 1 segundo y volver a verificar
    timeout /t 1 /nobreak > nul
    goto checkMongo
)

echo MongoDB iniciado correctamente.

REM --------------------------------------
REM 3️⃣ Iniciar Node.js en otra ventana
REM --------------------------------------
cd /d "D:\OneDriveFresiaPichardo\Cursos\Master en APIs RESTful-NodeJS\API REST para una Red Social\social-network-api"

start "Node Server" cmd.exe /k "npm start"

echo MongoDB y Node.js iniciados correctamente.
pause
