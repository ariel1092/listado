# Sistema de Registro de Deportistas - Kronos

Aplicación web moderna para registrar y gestionar información de deportistas con capacidad de exportación a Excel.

## 🚀 Características

- ✅ Formulario de registro de deportistas
- ✅ Visualización en tiempo real de datos
- ✅ Edición y eliminación de registros
- ✅ Exportación a Excel (.xlsx)
- ✅ Sincronización automática entre usuarios
- ✅ Diseño moderno y responsive
- ✅ Acceso remoto compartido

## 📋 Requisitos

- Node.js 16 o superior
- npm o yarn

## 🛠️ Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar el servidor:
```bash
npm start
```

Para desarrollo con auto-reload:
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3004`

## 📦 Estructura del Proyecto

```
lista-kronos/
├── public/
│   ├── index.html      # Interfaz principal
│   ├── styles.css      # Estilos con branding Kronos
│   ├── app.js          # Lógica del cliente
│   └── logo.png        # Logo de Kronos
├── server.js           # Servidor Express
├── database.js         # Operaciones SQLite
├── package.json        # Dependencias
└── README.md          # Este archivo
```

## 🌐 Despliegue en Render.com

1. Crear cuenta en [Render.com](https://render.com)

2. Crear nuevo "Web Service"

3. Conectar tu repositorio Git

4. Configurar:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node

5. Hacer deploy

Tu aplicación estará disponible en una URL como: `https://tu-app.onrender.com`

## 💾 Base de Datos

Los datos se almacenan en SQLite (`athletes.db`). El archivo se crea automáticamente al iniciar el servidor.

## 📊 Exportación a Excel

El archivo Excel exportado incluye:
- Logo y título "LISTADO DE DEPORTISTAS"
- Campos de configuración (Deporte, Entidad/Club)
- Tabla con todos los deportistas registrados
- Formato profesional con bordes y colores alternados

## 🎨 Personalización

Los colores corporativos de Kronos están definidos en `public/styles.css`:
- Primary: `#1a9b8e`
- Primary Dark: `#16857a`
- Primary Light: `#2dbfae`

## 📱 Uso

1. **Configurar**: Ingresar Deporte y Entidad/Club
2. **Agregar**: Completar formulario y hacer clic en "Agregar Deportista"
3. **Editar**: Hacer clic en "Editar" en la tabla
4. **Eliminar**: Hacer clic en "Eliminar" (con confirmación)
5. **Exportar**: Hacer clic en "Exportar a Excel"

## 🔄 Sincronización

La aplicación se actualiza automáticamente cada 10 segundos para mostrar cambios realizados por otros usuarios.

## 📄 Licencia

MIT
