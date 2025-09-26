# Rutas en Vue 3 con Vue Router (Vite)

Aplicación de ejemplo que demuestra el uso de enrutamiento en Vue 3 con **Vue Router 4**, construida con **Vite** y estilizada con **Tailwind CSS** y **DaisyUI**. El proyecto muestra:

- Alias de rutas (por ejemplo, `/` y `/inicio`).
- Rutas dinámicas con parámetros (por ejemplo, `/categorias/:subcategoria`, `/receta/:id`, `/autor/:nombre`).
- Paso de parámetros como `props` a los componentes de vista.
- Redirección para rutas no existentes (fallback 404 hacia `/`).
- Transiciones entre vistas con `<transition name="fade">`.
- Layout básico con `NavBar` y `Footer` envolviendo el contenido de cada vista.

## Rutas principales

- `/` o `/inicio`: página de inicio.
- `/categorias`: listado de categorías.
- `/categorias/:subcategoria`: detalle de una subcategoría. Recibe `subcategoria` como prop.
- `/receta/:id`: detalle de receta. Recibe `id` como prop.
- `/autor/:nombre`: perfil de autor. Recibe `nombre` como prop.
- Cualquier otra ruta: redirige a `/`.

La definición de rutas se encuentra en `src/router/index.js` y la salida de las vistas se renderiza mediante `<router-view />` en `src/App.vue`, con una animación de desvanecido al navegar entre páginas.

## Tecnologías

- Vue 3
- Vue Router 4
- Vite 7
- Tailwind CSS 4 + DaisyUI
- PostCSS

## Estructura relevante

- `src/main.js`: arranque de la aplicación e instalación del router.
- `src/router/index.js`: definición de rutas y configuración de historial.
- `src/App.vue`: layout principal con `NavBar`, `Footer`, transición y `<router-view />`.
- `src/views/`: componentes de vista (`Inicio.vue`, `Categorias.vue`, `Subcategoria.vue`, `DetalleReceta.vue`, `PerfilAutor.vue`, etc.).

## Cómo ejecutar el proyecto

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   Vite mostrará la URL local (por defecto suele ser `http://localhost:5173`).

3. Compila para producción:

   ```bash
   npm run build
   ```

4. Previsualiza el build de producción:

   ```bash
   npm run preview
   ```

## Notas

- Para modificar o añadir rutas, edita `src/router/index.js`.
- Para ajustar estilos globales, revisa `src/style.css` y la configuración de Tailwind en `tailwind.config.ts`.
