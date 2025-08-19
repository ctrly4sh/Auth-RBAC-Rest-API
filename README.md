# Auth RBAC REST API

A secure and scalable Role-Based Access Control (RBAC) REST API built with Express.js, TypeScript, and Prisma. This API provides authentication and authorization services with JWT tokens and refresh tokens.

Design
<img src="RBAC-design.png" alt="RBAC Design">

## 🚀 Features

- **User Authentication**
  - Secure registration and login with email/password
  - JWT-based authentication
  - Refresh token mechanism
  - Rate limiting for security

- **Role-Based Access Control (RBAC)**
  - Predefined user roles (ADMIN, USER)
  - Middleware for role-based route protection
  - Extensible permission system

- **Security**
  - Password hashing with bcrypt
  - Helmet for security headers
  - CORS protection
  - Environment-based configuration

- **Database**
  - PostgreSQL with Prisma ORM
  - Database migrations
  - Type-safe database queries

## 🛠️ Tech Stack

- **Runtime**: Node.js with Bun
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Security**: Helmet, bcrypt, express-rate-limit
- **Validation**: Express Validator

## 📦 Prerequisites

- Node.js (v18+)
- Bun (v1.0.0+)
- PostgreSQL (v14+)
- Git

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/ctrly4sh/Auth-RBAC-Rest-API.git
   cd Auth-RBAC-Rest-API
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/auth_rbac?schema=public"
   JWT_SECRET=your_jwt_secret_key
   JWT_REFRESH_SECRET=your_refresh_token_secret
   PORT=3000
   NODE_ENV=development
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the development server**
   ```bash
   bun run dev
   ```

   Or with hot-reload:
   ```bash
   bun run watch
   ```

## 📚 API Documentation

API documentation is available in the Postman collection file: `postman-collection.json`

### Available Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh-token` - Refresh access token
- `GET /api/users/me` - Get current user profile (protected)
- `GET /api/users` - Get all users (admin only)

## 🧪 Testing

To run tests:
```bash
bun test
```

## 🏗️ Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middlewares/    # Custom middlewares
├── routes/         # Route definitions
├── services/       # Business logic
├── types/          # TypeScript type definitions
├── app.ts          # Express application setup
└── server.ts       # Server entry point
```

## 🔒 Security

- All passwords are hashed using bcrypt
- JWT tokens for stateless authentication
- Rate limiting to prevent brute force attacks
- Security headers with Helmet
- Environment variables for sensitive data

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


Official Documentation and Resources
- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [JWT](https://jwt.io/)
- [Bun](https://bun.sh/)
- [Excalidraw](https://excalidraw.com/)
