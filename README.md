## Development backend server

```
nvm use 18.19.0 -- recommended node version
cd backend
npm install

-- add .env file with following key and your db values
DATABASE_URL=mongodb://{your server name/{your db name)?replicaSet={your replica alias}&retryWrites=true&w=majority&directConnection=true

-- configure ans seed db via prisma
npx prisma init --datasource-provider mongodb
npx prisma generate
npx prisma db seed

--start server
npm run start:dev
```

## Development frontent server

```
npm install
npm run start
```
