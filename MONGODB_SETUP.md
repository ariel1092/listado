# 🗄️ Configuración de MongoDB Atlas (Base de Datos Permanente)

## ¿Por qué MongoDB Atlas?

Los datos se estaban borrando porque Render reinicia el servicio en el plan gratuito. MongoDB Atlas soluciona esto:
- ✅ **Gratis** hasta 512MB (suficiente para miles de deportistas)
- ✅ **Permanente** - Los datos NUNCA se borran
- ✅ **Confiable** - Base de datos profesional en la nube
- ✅ **Rápido** - Acceso desde cualquier lugar

---

## 📝 Paso 1: Crear Cuenta en MongoDB Atlas

1. Ve a [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Regístrate con tu email (o usa Google/GitHub)
3. Completa el formulario de registro

---

## 🚀 Paso 2: Crear un Cluster Gratuito

1. Después de registrarte, te preguntará qué tipo de proyecto:
   - Selecciona **"M0 Free"** (el plan gratuito)

2. Configuración del Cluster:
   - **Cloud Provider**: AWS
   - **Region**: Selecciona la más cercana (ej: `us-east-1` o `sa-east-1` para Sudamérica)
   - **Cluster Name**: `kronos-cluster` (o el que prefieras)

3. Click en **"Create Deployment"**

---

## 🔐 Paso 3: Crear Usuario de Base de Datos

1. Te aparecerá un modal "Security Quickstart"
2. Crea un usuario:
   - **Username**: `kronosadmin`
   - **Password**: Genera una contraseña segura (guárdala, la necesitarás)
   - Click en **"Create Database User"**

**⚠️ IMPORTANTE**: Guarda la contraseña en un lugar seguro

---

## 🌐 Paso 4: Configurar Acceso desde Cualquier IP

1. En la misma pantalla, verás "Where would you like to connect from?"
2. Click en **"Add My Current IP Address"**
3. Luego click en **"Add Entry"** y agrega:
   - **IP Address**: `0.0.0.0/0` (permite acceso desde cualquier lugar)
   - **Description**: `Allow from anywhere`
4. Click en **"Finish and Close"**

---

## 🔗 Paso 5: Obtener la Connection String

1. En el dashboard, click en **"Connect"** en tu cluster
2. Selecciona **"Drivers"**
3. Selecciona:
   - **Driver**: Node.js
   - **Version**: 5.5 or later
4. Copia la **Connection String**, se verá así:
   ```
   mongodb+srv://kronosadmin:<password>@kronos-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

5. **IMPORTANTE**: Reemplaza `<password>` con la contraseña que creaste en el Paso 3

---

## 💻 Paso 6: Configurar en tu Aplicación Local

1. Crea un archivo `.env` en la carpeta del proyecto:

```bash
# En PowerShell
New-Item -Path ".env" -ItemType File
```

2. Abre el archivo `.env` y agrega:

```env
MONGODB_URI=mongodb+srv://kronosadmin:TU_PASSWORD_AQUI@kronos-cluster.xxxxx.mongodb.net/kronos-deportistas?retryWrites=true&w=majority
```

**Reemplaza**:
- `TU_PASSWORD_AQUI` con tu contraseña real
- `kronos-cluster.xxxxx` con tu cluster real

---

## ☁️ Paso 7: Configurar en Render

1. Ve a tu servicio en Render.com
2. Click en **"Environment"** en el menú lateral
3. Click en **"Add Environment Variable"**
4. Agrega:
   - **Key**: `MONGODB_URI`
   - **Value**: Tu connection string completa (la misma del `.env`)
5. Click en **"Save Changes"**
6. Render re-desplegará automáticamente

---

## ✅ Paso 8: Probar la Conexión

1. Detén el servidor local (Ctrl+C)
2. Instala la nueva dependencia:
```bash
npm install
```

3. Inicia el servidor:
```bash
npm start
```

4. Deberías ver en la consola:
```
🚀 Servidor corriendo en http://localhost:3004
✅ Conectado a MongoDB
📊 Base de datos: MongoDB Atlas
```

---

## 🎉 ¡Listo!

Ahora tus datos están en MongoDB Atlas y:
- ✅ **Persisten para siempre** - No se borran nunca
- ✅ **Sincronizados** - Mismo datos en local y en Render
- ✅ **Seguros** - Backups automáticos de MongoDB
- ✅ **Escalables** - Puedes crecer hasta 512MB gratis

---

## 🔄 Migrar Datos Existentes (Si los tienes)

Si tenías datos en `data.json` que quieres recuperar:

1. Abre `data.json`
2. Copia los datos de los deportistas
3. Agrégalos manualmente desde la interfaz web
4. O contacta conmigo para crear un script de migración

---

## 🆘 Problemas Comunes

### Error: "Authentication failed"
- Verifica que la contraseña en `MONGODB_URI` sea correcta
- No debe tener caracteres especiales sin codificar

### Error: "Connection timeout"
- Verifica que agregaste `0.0.0.0/0` en las IPs permitidas
- Revisa tu conexión a internet

### No aparece "✅ Conectado a MongoDB"
- Verifica que el archivo `.env` esté en la raíz del proyecto
- Reinicia el servidor

---

## 📊 Ver tus Datos en MongoDB Atlas

1. Ve a [cloud.mongodb.com](https://cloud.mongodb.com)
2. Click en **"Browse Collections"** en tu cluster
3. Verás las colecciones:
   - `athletes` - Todos los deportistas
   - `configs` - Configuración (Deporte, Entidad)
