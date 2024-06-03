## Development backend server

```
nvm use 18.19.0 -- recommended node version
cd backend
npm install

-- add .env file with following key and your db values in the backend folder
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

---

## Answers to the questions


1.	What plugins or extensions are best suited in the Angular + PrimeNG
Answer:
    Angular Schematics - create components via command,
    Prettire - code formatter
    ESLint - check and correct errors and typos in code
    Rxjs, Angular Forms Module, HttpClient Module and Router for effecient SPA development


2.	In what format should data be received to display the result?
Answer:
	JSON

3.	How to request data for displaying the result (format)?
Answer:
	Strong typing in server and client: you can find examples in these files =>
	 backend\prisma\seed.ts,
	 backend\prisma\schema.prisma,
	 src\app\services\node.service.ts also method signatures with expected parameters (not included here)

4.	How to implement multilingual support for types and names, and what is the best way to do it?
Answer:
	Angular provides built-in support for internationalization and localization - i18n

5.	What to do if the server cannot return the desired format and is forced to return bulky objects with fields in different writing styles?
Answer:
	export class TransformInterceptor<T> implements NestInterceptor<Partial<T>, T> {}

	 @UseInterceptors(new TransformInterceptor(MyDesiredDataDto))
     @Get()
      findAll(@Query() data?: MyDesiredDataDto): Observable<sometype> {}

7.	Design a mockup for the data that needs to be received from the server.
Answer:
 	backend\prisma\seed.ts,
	 backend\prisma\schema.prisma

8.	Provide an example of a request for obtaining data (specify what data to request).
Answer:
	backend\src\app.controller.ts

10.	The types on the server are differentiated by identifiers: 0 - Site, 1 - Zone, Layer - 3, Placemark - 4
Answer:
	Besause I'm using mongo - I am restricted to uuid types so this part was implemented differently








