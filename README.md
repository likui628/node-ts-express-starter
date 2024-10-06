# node-ts-express-starter

A boilerplate/starter project for quickly building RESTful APIs using Node.js, Express, and Prisma.

## Installation

Clone the repo:

```bash
git clone --depth 1 https://github.com/likui628/node-ts-express-starter.git
cd node-ts-express-starter
npx rimraf ./.git
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Features

- **Authentication and authorization**: using [passport](http://www.passportjs.org)
- **Validation**: request data validation using [zod](https://zod.dev/)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)

## Project Structure

```plaintext
prisma\
 |--schema.prisma\  # Prisma schema file
 |--seed.ts\        # Prisma seed file  
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--middlewares\    # Custom express middlewares
 |--types\          # Type definitions
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.ts          # Express app
 |--index.ts        # App entry point
```

## API Documentation

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /v1/auth/register` - register\
`POST /v1/auth/login` - login\
`POST /v1/auth/refresh` - refresh auth tokens\
`POST /v1/auth/logout` - logout\

**User routes**:\
`POST /v1/users` - create a user\
`GET /v1/users` - get all users\
`GET /v1/users/:userId` - get user\
`PATCH /v1/users/:userId` - update user\
`DELETE /v1/users/:userId` - delete user

## Acknowledgment

- [hagopj13/node-express-boilerplate](https://github.com/hagopj13/node-express-boilerplate/)
- [gitdagray/refresh_token_rotation](https://github.com/gitdagray/refresh_token_rotation)

## License

[MIT](LICENSE)