# Uloans Express API

Uloans Express is a small REST API for user authentication, user profiles, and loan applications. It is built with Node.js and Express using ES modules.

> **Current status:** user accounts and loan applications are stored in memory. All data is lost when the server restarts. Database persistence and Swagger documentation can be added as the next milestones.

## Features

- User registration
- User login with a JWT token
- JWT-protected routes
- User profile retrieval
- User profile updates
- Loan application creation
- Loan history retrieval
- Loan cancellation
- Centralized route prefix: `/api/v1`

## Technology Stack

- Node.js
- Express 5
- JSON Web Token (`jsonwebtoken`)
- ECMAScript modules
- In-memory collections (`Map` and arrays)

## Requirements

- Node.js 18 or newer
- npm 9 or newer

Check your installed versions:

```bash
node --version
npm --version
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Aldistwn29/rewite-uloans-expressJs.git
   cd uloan-express
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

The API will be available at:

```text
http://localhost:8080
```

## Environment Configuration

The repository includes an `.env.example` template for the planned environment-based configuration.

Copy it to `.env` when environment configuration is enabled in the application:

```bash
copy .env.example .env
```

On macOS or Linux:

```bash
cp .env.example .env
```

Never commit `.env` or any file containing real credentials. Use strong, unique values for secrets outside local development.

> **Note:** the current authentication middleware and controller still use an internal JWT secret constant. Moving that value to `process.env.JWT_SECRET` is recommended before deploying the application.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Starts the Express server |
| `npm test` | Placeholder test command; tests are not configured yet |

## API Overview

All API routes use the `/api/v1` prefix.

### Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "UP",
  "message": "Uloan API is running"
}
```

### Authentication

#### Register a user

```http
POST /api/v1/auth/register
Content-Type: application/json
```

Request body:

```json
{
  "name": "Aldi Setiawan",
  "email": "aldi@example.com",
  "password": "your-password"
}
```

#### Login

```http
POST /api/v1/auth/login
Content-Type: application/json
```

Request body:

```json
{
  "email": "aldi@example.com",
  "password": "your-password"
}
```

The response contains a JWT token. Send it with protected requests:

```http
Authorization: Bearer <token>
```

### User Profile

All profile endpoints require authentication.

#### Get the current profile

```http
GET /api/v1/user/profile
Authorization: Bearer <token>
```

#### Update the current profile

```http
PUT /api/v1/user/profile
Authorization: Bearer <token>
Content-Type: application/json
```

Request body:

```json
{
  "name": "Aldi Setiawan Updated"
}
```

### Loans

All loan endpoints require authentication.

#### Create a loan application

```http
POST /api/v1/loans
Authorization: Bearer <token>
Content-Type: application/json
```

Request body:

```json
{
  "amount": 5000000,
  "tenor": 12
}
```

The current validation requires:

- `amount` to be at least `500000`
- `tenor` to be at least `3` months

#### Get the current user's loan history

```http
GET /api/v1/loans
Authorization: Bearer <token>
```

#### Cancel a loan application

```http
PATCH /api/v1/loans/:loanId/cancel
Authorization: Bearer <token>
```

Only loans belonging to the authenticated user can be cancelled. A loan can only be cancelled while its status is `PENDING`.

> A dedicated loan-details endpoint is not currently exposed by the active route/controller implementation. It should be added together with the database-backed loan repository.

## Typical Request Flow

1. Register a user.
2. Log in with the same email and password.
3. Copy the JWT token from the login response.
4. Add the token to the `Authorization` header.
5. Create or view loan applications.
6. Cancel a pending loan when necessary.

Example using PowerShell:

```powershell
$body = @{
  name = "Aldi Setiawan"
  email = "aldi@example.com"
  password = "your-password"
} | ConvertTo-Json

Invoke-RestMethod `
  -Method Post `
  -Uri http://localhost:8080/api/v1/auth/register `
  -ContentType "application/json" `
  -Body $body
```

## Project Structure

```text
.
├── server.js
└── src
    ├── app.js
    ├── controller
    │   ├── auth.controller.js
    │   ├── loan.controller.js
    │   └── user.controller.js
    ├── middleware
    │   └── auth.middleware.js
    ├── repository
    │   └── loan.repository.js
    ├── routes
    │   ├── auth.routes.js
    │   ├── loan.routes.js
    │   └── user.routes.js
    └── services
        └── loan.services.js
```

The application currently follows a simple layered structure:

- **Routes** define URL paths and middleware.
- **Controllers** handle HTTP requests and responses.
- **Services** contain loan business rules.
- **Repositories** manage the in-memory loan collection.
- **Middleware** validates JWT tokens.

## Error Responses

The API uses JSON error responses. A typical error looks like this:

```json
{
  "error": "Bad Request",
  "message": "field amount and tenor wajib diisi"
}
```

Common status codes:

| Status | Meaning |
| --- | --- |
| `201` | Resource created |
| `200` | Request completed successfully |
| `400` | Invalid or missing request data |
| `401` | Authentication is missing or credentials are invalid |
| `403` | JWT token is invalid or expired |
| `404` | Resource was not found |
| `409` | Resource conflicts with existing data |
| `422` | Request is valid but violates a business rule |

## Data Persistence Warning

This version uses in-memory storage:

- Registered users are stored in a `Map`.
- Loan applications are stored in an array.
- IDs are generated in the running process.
- Restarting the server removes all users and loans.
- Running multiple server instances does not share data.

For production, replace the in-memory storage with a database repository and hash passwords before storing them.

## Recommended Next Steps

1. Persist users and loans in PostgreSQL.
2. Move `JWT_SECRET` to environment variables.
3. Hash passwords with a password-hashing library.
4. Add request validation with a schema validation library.
5. Add automated unit and integration tests.
6. Add OpenAPI/Swagger documentation.
7. Add a CI workflow for formatting, tests, and security checks.

## License

No license has been specified yet.
