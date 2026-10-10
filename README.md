# Club

Aplicación React + Vite + Tailwind. Funciona de forma independiente, sin Base44.

## Cómo ejecutarla

Necesitas [Node.js](https://nodejs.org) (versión LTS).

```bash
npm install
npm run dev
```

Abre la dirección que aparece (normalmente http://localhost:5173).

Otros comandos: `npm run build` (genera la carpeta `dist`) y `npm run preview`.

## Modo local (demo)

El registro y el inicio de sesión viven en `src/api/localClient.js` y guardan todo en el
`localStorage` del navegador. Qué significa eso:

- Los usuarios existen solo en ese navegador. No hay base de datos compartida.
- **No se envían correos.** Al registrarte, escribe cualquier código de 6 dígitos.
- El enlace de "olvidé mi contraseña" aparece en la consola del navegador (F12).
- El primer usuario registrado queda como `admin`.
- "Continuar con Google / Apple" muestra un aviso: no está disponible en modo local.
- Las contraseñas se guardan con hash SHA-256 en el navegador. Es solo para desarrollo,
  no es seguridad real.

Los datos de ofertas, reels y comunidad vienen de `src/data/` (datos de ejemplo).

## Para ponerla en producción

Reemplaza `src/api/localClient.js` por un backend real (Supabase, Firebase, tu propia API)
manteniendo los mismos nombres de función (`register`, `verifyOtp`, `loginViaEmailPassword`,
`me`, `updateMe`, `logout`, etc.). El resto de la app no necesita cambios.

## Pendientes conocidos

- El logo se carga desde una URL externa en `src/components/club/Brand.jsx` y `Splash.jsx`.
  Descarga la imagen, guárdala en `public/logo.png` y cambia `LOGO_URL` a `"/logo.png"`.
- `src/pages/Legal.jsx` menciona a Base44 como proveedor de autenticación. Actualiza ese texto.
