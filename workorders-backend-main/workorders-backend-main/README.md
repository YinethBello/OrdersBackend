# Backend con Express.js, JWT y Prisma WorkOrders

Este proyecto es un backend desarrollado con Express.js, utilizando JWT para autenticación, Prisma como ORM para conectar con una base de datos PostgreSQL, y Nodemon para el desarrollo.

## Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:

- [Node.js](https://nodejs.org/) (versión 14.0 o superior)
- [npm](https://www.npmjs.com/) (normalmente viene con Node.js)
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Instalación

Sigue estos pasos para instalar la aplicación:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/KevinZea/workorders-backend.git
   cd tu-repositorio-backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura la base de datos:
   - Crea una nueva base de datos PostgreSQL llamada `workorders`.
   - Asegúrate de tener las credenciales de acceso (usuario, contraseña, host, puerto).

4. Configura el archivo `.env`:
   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```
   DATABASE_URL="postgresql://postgres:password@localhost:5432/workorders"
   SECRET_WORD=WorkOrders
   PORT=4000
   ```
   Asegúrate de ajustar los valores según tu configuración local.

5. Ejecuta las migraciones de Prisma:
   ```bash
   npx prisma migrate dev
   ```

## Ejecución Local

Para ejecutar la aplicación en tu entorno local:

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. El servidor estará escuchando en `http://localhost:4000` (o el puerto especificado en tu archivo `.env`).

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

- `npm start`: Inicia el servidor en modo producción.
- `npm run dev`: Inicia el servidor con Nodemon para desarrollo.

## Estructura del Proyecto

```
tu-repositorio-backend/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   └── index.js
│
├── .env
├── package.json
└── README.md
```

## Uso de Prisma

Aquí hay algunos comandos útiles de Prisma para gestionar tu base de datos:

1. Generar el cliente de Prisma:
   ```bash
   npx prisma generate
   ```

2. Abrir Prisma Studio (interfaz gráfica para la base de datos):
   ```bash
   npx prisma studio
   ```

3. Crear una nueva migración después de cambiar el schema:
   ```bash
   npx prisma migrate dev --name nombre_de_la_migracion
   ```

4. Aplicar migraciones en producción:
   ```bash
   npx prisma migrate deploy
   ```

## Modificaciones Básicas de la Base de Datos

Para realizar modificaciones básicas en la base de datos, edita el archivo `prisma/schema.prisma`. Aquí tienes algunos ejemplos:

1. Crear un nuevo modelo:
   ```prisma
   model User {
     id        Int      @id @default(autoincrement())
     email     String   @unique
     name      String?
     createdAt DateTime @default(now())
   }
   ```

2. Añadir un campo a un modelo existente:
   ```prisma
   model Post {
     id        Int      @id @default(autoincrement())
     title     String
     content   String?
     published Boolean  @default(false)
     author    User     @relation(fields: [authorId], references: [id])
     authorId  Int
   }
   ```

3. Crear una relación entre modelos:
   ```prisma
   model User {
     id    Int    @id @default(autoincrement())
     posts Post[]
   }

   model Post {
     id       Int  @id @default(autoincrement())
     author   User @relation(fields: [authorId], references: [id])
     authorId Int
   }
   ```

Después de hacer cambios en el schema, no olvides ejecutar `npx prisma migrate dev` para aplicar los cambios a tu base de datos.

## Contribuir

Si deseas contribuir al proyecto, por favor:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/AmazingFeature`).
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`).
4. Haz push a la rama (`git push origin feature/AmazingFeature`).
5. Abre un Pull Request.

## Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en el repositorio de GitHub.

---

¡Gracias por usar nuestro backend! Esperamos que disfrutes trabajando con Work Orders Backend.