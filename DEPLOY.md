# 🚀 Guía de Despliegue en Render.com

## Paso 1: Crear Repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Click en el botón **"+"** arriba a la derecha → **"New repository"**
3. Configura:
   - **Repository name**: `lista-kronos`
   - **Description**: "Sistema de registro de deportistas"
   - **Visibility**: Public o Private (ambos funcionan)
4. **NO** marques "Initialize this repository with a README"
5. Click **"Create repository"**

## Paso 2: Conectar tu Proyecto Local con GitHub

GitHub te mostrará comandos. Copia y ejecuta estos en tu terminal:

```bash
cd "c:\Users\feder\OneDrive\Desktop\lista kronos"
git remote add origin https://github.com/TU_USUARIO/lista-kronos.git
git branch -M main
git push -u origin main
```

**Nota**: Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub.

Si te pide credenciales, usa un **Personal Access Token** en lugar de tu contraseña.

## Paso 3: Desplegar en Render

1. Ve a [render.com](https://render.com) y regístrate/inicia sesión
2. Click en **"New +"** → **"Web Service"**
3. Click en **"Connect account"** para conectar GitHub
4. Selecciona el repositorio **`lista-kronos`**
5. Configura el servicio:
   
   | Campo | Valor |
   |-------|-------|
   | **Name** | `lista-kronos` |
   | **Region** | Elige el más cercano (US East recomendado) |
   | **Branch** | `main` |
   | **Root Directory** | (dejar vacío) |
   | **Runtime** | `Node` |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Instance Type** | `Free` |

6. Click **"Create Web Service"**

## Paso 4: Esperar el Deploy

- Render comenzará a construir tu aplicación (toma 2-5 minutos)
- Verás logs en tiempo real
- Cuando termine, verás "Live" en verde

## Paso 5: Obtener tu URL

Tu aplicación estará disponible en:
```
https://lista-kronos.onrender.com
```
(o el nombre que hayas elegido)

## 🎉 ¡Listo!

Comparte esa URL con tu equipo. Todos podrán acceder desde cualquier lugar.

---

## ⚠️ Notas Importantes

### Inactividad en Plan Gratuito
- Render pone tu app a "dormir" después de 15 minutos sin uso
- La primera visita después de dormir toma ~30 segundos en despertar
- Visitas subsecuentes son instantáneas

### Persistencia de Datos
- Los datos en `data.json` se mantienen mientras el servicio esté activo
- **IMPORTANTE**: En el plan gratuito, los datos pueden perderse si Render reinicia el servicio
- Para datos permanentes, considera:
  - Upgrade a plan pago ($7/mes) con disco persistente
  - Usar una base de datos externa (MongoDB Atlas gratuito)

### Actualizaciones
Cada vez que hagas cambios:
```bash
git add .
git commit -m "Descripción de cambios"
git push
```
Render detectará el push y re-desplegará automáticamente.

---

## 🆘 Problemas Comunes

**Error: "Command not found: git"**
- Instala Git desde [git-scm.com](https://git-scm.com)

**Error al hacer push a GitHub**
- Usa un Personal Access Token en lugar de contraseña
- Ve a GitHub → Settings → Developer settings → Personal access tokens

**La app no inicia en Render**
- Revisa los logs en el dashboard de Render
- Verifica que `package.json` tenga los scripts correctos
