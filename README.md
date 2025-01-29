# Next.js Auth Role-Based Access Control Project

This is an authentication and role-based access control (RBAC) project built using **Next.js**, **Prisma ORM**, and **PostgreSQL**. The application defines three user roles: **User**, **Manager**, and **Admin**, each with specific permissions.

## Features
- **User**:
  - Can add their skills.
- **Manager**:
  - Can add company hiring details.
- **Admin**:
  - Can view all users.
  - Can view all listed companies.

## Tech Stack
- **Frontend**: Next.js (React framework), Tailwind CSS
- **Backend**: API Routes in Next.js
- **Database**: PostgreSQL
- **ORM**: Prisma

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/your-repo.git
   ```
2. Navigate to the project directory:
   ```sh
   cd your-repo
   ```
3. Install dependencies:
   ```sh
   pnpm install
   ```
4. Copy .env.example to .env.local and update the variables:
   ```sh
   cp .env.example .env.local
   ```
5. Start the development server:
   ```sh
   pnpm run dev
   ```

## API Routes
- **Users**:
  - `GET /api/user/skills` - Get user skills
  - `POST /api/user/skills` - Add user skills
- **Managers**:
  - `Get /api/manager/company` - Get company details
  - `POST /api/manager/company` - Add company details
- **Admin**:
  - `GET /api/admin/users` - View all users
  - `GET /api/admin/companies` - View all companies
---

Happy coding! 🚀
