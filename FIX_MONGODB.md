# 🔧 Solución Rápida: Error de Conexión MongoDB Atlas

## ❌ Problema
MongoDB Atlas está bloqueando la conexión porque tu IP no está autorizada.

## ✅ Solución (2 minutos)

### Paso 1: Ir a MongoDB Atlas
1. Ve a [cloud.mongodb.com](https://cloud.mongodb.com)
2. Inicia sesión con tu cuenta

### Paso 2: Configurar Acceso de Red
1. En el menú lateral, click en **"Network Access"**
2. Click en **"Add IP Address"**
3. Selecciona **"Allow Access from Anywhere"**
   - O ingresa: `0.0.0.0/0`
4. Click en **"Confirm"**

### Paso 3: Esperar (30 segundos)
- MongoDB Atlas tarda unos segundos en aplicar los cambios
- Espera 30 segundos

### Paso 4: Reiniciar el Servidor
```bash
# Detener el servidor (Ctrl+C en la terminal donde corre)
# Luego iniciar de nuevo:
npm start
```

### Paso 5: Probar
- Abre `http://localhost:3004`
- Intenta agregar un deportista
- Debería funcionar correctamente

---

## 🎯 Verificación Rápida

Si funcionó correctamente, verás en la consola del servidor:
```
✅ Conectado a MongoDB
```

Y podrás agregar deportistas sin errores.

---

## 🔄 Alternativa: Usar tu IP Específica (Más Seguro)

Si prefieres no usar "0.0.0.0/0" (acceso desde cualquier lugar):

1. Encuentra tu IP actual:
```bash
curl ifconfig.me
```

2. En MongoDB Atlas > Network Access:
   - Click "Add IP Address"
   - Click "Add Current IP Address"
   - Confirm

**Nota**: Si tu IP cambia (ej: cambias de WiFi), tendrás que repetir este paso.

---

## 🆘 Si Sigue Sin Funcionar

1. Verifica que el cluster esté activo (no pausado)
2. Verifica que el usuario `sangeronimo` tenga permisos de lectura/escritura
3. Revisa que la contraseña en `.env` sea correcta
