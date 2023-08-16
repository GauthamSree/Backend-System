# Backend System with Authentication

- Backend API.

## Tech Stack

- Node.js
- TypeScript
- Express.js
- Postgres
- Drizzle
- Docker

## Installation (Using Docker)

1. Run `docker compose up`
2. Use `Thunder Client\Postman`


## Installation (locally)

1. Clone the repository
2. Install all required modules:
    ```zsh
    npm install
    ```
3. Added `.env` file
    ```
    NODE_ENV=DEVELOPMENT
    PORT=3000

    DB_CONNECTION=postgres://postgres:@localhost:5432/backendsystem
    JWT_SECRET_KEY=accessTokenPrivateKey
    ```
4. Run the typescript code:
    ```zsh
    npm run dev
    ```

## DB Schema
```SQL
CREATE TABLE IF NOT EXISTS "userData" (
	"user_id" integer NOT NULL,
	"key" varchar(30) NOT NULL,
	"value" varchar(30) NOT NULL,
	CONSTRAINT userData_user_id_key PRIMARY KEY("user_id","key")
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(30) NOT NULL,
	"email" varchar(30) NOT NULL,
	"password" varchar(255) NOT NULL,
	"full_name" text NOT NULL,
	"age" integer NOT NULL,
	"gender" varchar(10) NOT NULL
);
```

## API Endpoints
1. POST /api/register
    - Request Format
        ```json
        {
            "username": "example_user",
            "email": "user@example.com",
            "password": "secure_password123",
            "full_name": "John Doe",
            "age": 30,
            "gender": "male"
        }
        ```
2. POST /api/token
    - Request Format
        ```json
        {
            "username": "example_user",
            "password": "secure_password123"
        }
        ```
3. POST /api/data
    - Request Format
        ```json
        {
            "key": "unique_key",
            "value": "data_value"
        }
        ```
    - Header 
        - `Authorization`: Bearer `access_token`
4. GET /api/data/{key}
    - Header 
        - `Authorization`: Bearer `access_token`
5. PUT /api/data/{key}
    - Request Format
        ```json
        {
            "value": "new_data_value"
        }
        ```
    - Header 
        - `Authorization`: Bearer `access_token`
6. DELETE /api/data/{key}
    - Header 
        - `Authorization`: Bearer `access_token`

## Directory Structure

* `src/` - Contains the TypeScript source code.
* `src/routes/` - Contains the API routes.
* `src/middlewares/` - Contains the middlewares.
* `src/services/` - Contains the business logic.
* `src/controllers/` - Contains the API controllers.
* `package.json` - Project configuration and dependencies.
* `tsconfig.json` - TypeScript compiler configuration.

## Contributing

Contributions are welcome! Please create an issue or pull request for any improvements or bug fixes.