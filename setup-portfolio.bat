@echo off
echo ========================================
echo   Creando Portfolio Personal
echo ========================================
echo.

:: Crear estructura de carpetas
echo Creando estructura de carpetas...
mkdir portfolio-app 2>nul
cd portfolio-app

:: Backend
mkdir backend\models backend\routes backend\middleware backend\uploads\avatars backend\uploads\projects 2>nul
cd backend

:: Crear archivos del backend
echo Creando archivos del backend...

:: package.json
(
echo {
echo   "name": "portfolio-backend",
echo   "version": "1.0.0",
echo   "description": "Backend para portafolio personal",
echo   "main": "server.js",
echo   "scripts": {
echo     "start": "node server.js",
echo     "dev": "nodemon server.js"
echo   },
echo   "dependencies": {
echo     "express": "^4.18.2",
echo     "mongoose": "^8.0.3",
echo     "cors": "^2.8.5",
echo     "dotenv": "^16.3.1",
echo     "multer": "^1.4.5-lts.1",
echo     "express-rate-limit": "^7.1.5"
echo   },
echo   "devDependencies": {
echo     "nodemon": "^3.0.2"
echo   }
echo }
) > package.json

:: .env
(
echo MONGODB_URI=mongodb+srv://tu-usuario:tu-password@cluster.mongodb.net/portfolio
echo PORT=5000
) > .env

:: .gitignore
(
echo node_modules/
echo .env
echo uploads/
echo *.log
echo .DS_Store
) > .gitignore

echo Backend creado!
echo.

:: Volver y crear frontend
cd ..
echo Creando aplicacion React (esto puede tomar unos minutos)...
call npx create-react-app frontend --template typescript

:: Verificar si se creo correctamente
if not exist frontend (
    echo ERROR: No se pudo crear la aplicacion React
    echo Por favor, verifica que Node.js este instalado correctamente
    pause
    exit /b 1
)

cd frontend

:: Instalar dependencias adicionales
echo.
echo Instalando dependencias adicionales...
call npm install axios framer-motion lucide-react
call npm install -D tailwindcss postcss autoprefixer @types/node

:: Inicializar Tailwind
call npx tailwindcss init -p

:: Crear carpeta de servicios
mkdir src\services 2>nul
mkdir src\types 2>nul

echo.
echo ========================================
echo   INSTALACION COMPLETADA!
echo ========================================
echo.
echo Proximos pasos:
echo.
echo 1. Copia el contenido de App.tsx en portfolio-app\frontend\src\App.tsx
echo 2. Copia el contenido de api.ts en portfolio-app\frontend\src\services\api.ts
echo 3. Copia el contenido de index.ts en portfolio-app\frontend\src\types\index.ts
echo 4. Actualiza portfolio-app\frontend\src\index.css con el contenido de Tailwind
echo 5. Actualiza portfolio-app\frontend\tailwind.config.js
echo 6. Configura MongoDB en portfolio-app\backend\.env
echo.
echo Para iniciar la aplicacion:
echo   Terminal 1: cd backend ^&^& npm install ^&^& npm run dev
echo   Terminal 2: cd frontend ^&^& npm start
echo.
pause