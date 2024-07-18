
## Documentación
- http://localhost:3000/api-docs/

## Instalaciones 
Se debe instalar los siguientes paquetes:
- npm install --save-dev sequelize-cli
- npm install -g nodemon

## Variables del .ENV
- DB_USER=usuarios_base_de_datos
- DB_PASSWORD=contraseña_usuario
- DB_HOST=localhost
- DB_NAME=nombre_de_la_base_de_datos
- JWT_SECRET=clave_secreta
## Migraciones
Crear Migraciones
- npx sequelize-cli db:migrate

## Seeders
Poblar base de datos
- npm run seed


## Comenzar a usar el proyecto
- npm i
- npm start