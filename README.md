# Frontend-GoCar

## Descripción General
Frontend-GoCar es una aplicación Angular para la gestión y visualización de autos, con funcionalidades de registro, login, administración de usuarios y catálogo de autos. El frontend se comunica con un backend para operaciones CRUD y autenticación.

---

## Componentes Principales

### HomeComponent
- **Ubicación:** `src/app/components/home-component/`
- **Función:** Muestra el catálogo público de autos en formato grid. Permite ver detalles de cada auto y actualiza la lista automáticamente al iniciar/cerrar sesión.
- **Características:** Grid de autos, navegación a detalle, integración con el servicio de autos.

### UserComponent
- **Ubicación:** `src/app/components/user-component/`
- **Función:** Pantalla post-login para usuarios. Muestra todos los autos en grid y un menú lateral tipo drawer con opciones de usuario.
- **Características:** Sidebar con opciones (actualizar datos, agregar auto, mis autos, cerrar sesión), grid de autos, refresco automático al cambiar sesión.

### AutoDetailComponent
- **Ubicación:** `src/app/components/auto-detail-component/`
- **Función:** Muestra la información detallada de un auto seleccionado.
- **Características:** Vista profesional tipo e-commerce, recarga automática al cambiar sesión.

### RegisterUserComponent
- **Ubicación:** `src/app/components/register-user-component/`
- **Función:** Formulario de registro de usuario. Permite crear una cuenta nueva.
- **Características:** Validación de contraseñas en tiempo real, campos organizados en filas de dos columnas, botón para ir al home, enlace para login.

### AuthComponent (Login)
- **Ubicación:** `src/app/components/auth-component/`
- **Función:** Formulario de login para usuarios.
- **Características:** Validación de campos, mensaje de error si faltan datos o credenciales incorrectas, botón para ir al home.

### UpdateUserComponent
- **Ubicación:** `src/app/components/update-user-component/`
- **Función:** Permite al usuario actualizar sus datos personales.
- **Características:** Formulario vertical, mensajes de éxito/error, integración con el servicio de actualización.

### AdminComponent
- **Ubicación:** `src/app/components/admin-component/`
- **Función:** Panel de administración para gestión de usuarios.
- **Características:** Menú lateral, búsqueda de usuario por cédula, visualización en card con botón de eliminar, manejo de errores amigable.

---

## Servicios

- **AutoService:** Maneja la comunicación con el backend para operaciones de autos (listar, detalle, agregar, etc.).
- **AuthService:** Gestiona la autenticación y el manejo de tokens.
- **RegisterService:** Encargado del registro de nuevos usuarios.
- **UpdateProfileService:** Permite actualizar los datos del usuario.
- **AdminService:** Funciones administrativas como buscar y eliminar usuarios.

---

## Funcionalidades Clave

- **Catálogo de autos:** Grid responsivo, imágenes, detalles.
- **Autenticación:** Login, registro, validación de campos.
- **Gestión de usuario:** Actualización de datos, menú lateral, logout.
- **Panel admin:** Búsqueda y eliminación de usuarios, feedback visual.
- **Validaciones:** Contraseñas iguales, campos obligatorios, mensajes de error/success.
- **Navegación:** Botones para ir al home/login, sidebar y drawer.

---

## Buenas Prácticas

- Componentes standalone con `imports` en el decorador.
- Uso de servicios para lógica de negocio y comunicación con backend.
- Validaciones en tiempo real y feedback visual.
- Separación clara entre lógica y presentación.
- Manejo de errores amigable para el usuario.

---

## Instalación y Ejecución

1. Instala dependencias:
	```bash
	npm install
	```
2. Ejecuta el proyecto:
	```bash
	ng serve
	```
3. Accede a la app en `http://localhost:4200`

---

¿Dudas o mejoras? Revisa los componentes y servicios en la carpeta `src/app/components/` y `src/app/services/`.
# FrontendGoCar

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
