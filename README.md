# Values Prototype

This repository contains a work‑in‑progress web application for exploring
personal values. The stack uses a PHP backend and a React Router + TypeScript
frontend. Development and production environments are configured with Docker
Compose.

## Repository Layout
- `backend/` – PHP 8 project with a simple Slim setup and a database schema.
- `frontend/` – React application written in TypeScript and styled with
  Tailwind CSS.
- `nginx/` – Production Nginx configuration used in the Docker setup.
- `docker-compose.dev.yml` – Local development stack.
- `docker-compose.prod.yml` – Production stack with Nginx.
- `deploy.sh` – Helper script for pulling the latest code and rebuilding the
  production containers.

## Getting Started
1. Ensure you have Docker and Docker Compose installed.
2. Run the development stack:
   ```bash
   docker compose -f docker-compose.dev.yml up
   ```
   The frontend will be available at `http://localhost:5173` and the backend at
   `http://localhost:8080`.

The `frontend` directory includes its own [README](frontend/README.md) with
more details about building and deploying the React application.


## 🛠 Backend Setup: PHP Slim API
The backend is built using PHP 8.2, with a clean, modular architecture powered by Slim 4. It uses a layered structure (Controller → Service → Repository → Model) to keep code organized, testable, and scalable.

### 📁 Folder Structure
```
habit-tracker/
├── .env                 # Environment variables (e.g. DB path)
├── composer.json        # PHP dependencies and autoload setup
├── database/
│   └── schema.sql       # SQLite schema for tables
├── config/
│   ├── settings.php     # App-level config (e.g. paths, flags)
│   ├── dependencies.php # Dependency injection bindings
│   └── routes.php       # All HTTP routes mapped to controllers
├── public/
│   └── index.php        # Slim front controller (entry point)
└── src/
    ├── Controllers/     # Handle HTTP input/output (PSR-7)
    ├── Services/        # Business logic layer
    ├── Repositories/    # SQL and data access (uses PDO)
    └── Models/          # Typed DTOs for data (no logic)
```

> Only public/index.php is exposed to the web server. Everything else stays private.

### 🧱 Architecture Overview
Each request flows through these layers:

```
Request
  ↓
Route (defined in config/routes.php)
  ↓
Controller → Service → Repository → Database
                        ↑          ↓
                     Model ← Hydrated from SQL
  ↓
JSON Response
```

* Models (src/Models) — Just data. Think of them like Python dataclasses or TypeScript interfaces.
* Repositories (src/Repositories) — Contain SQL logic. Return models from the DB.
* Services (src/Services) — Contain business rules (e.g., validations, decisions).
* Controllers (src/Controllers) — Handle HTTP input/output. They read the request, call a service, and return JSON.

### 📦 Key Dependencies
All packages are managed via Composer:

```json
{
  "require": {
    "php": "^8.2",
    "slim/slim": "^4.12",
    "slim/psr7": "^1.7",
    "php-di/php-di": "^7.0",
    "vlucas/phpdotenv": "^5.5"
  },
  "autoload": {
    "psr-4": {
      "App\\": "src/"
    }
  },
  "scripts": {
    "start": "php -S localhost:8080 -t public"
  }
}
```
### ⚙️ Local Development Setup
Install PHP 8.2 and Composer

Clone the project

Install dependencies:

```bash
composer install
```
Create the SQLite DB:

```bash
sqlite3 database/app.db < database/schema.sql
```
Copy and edit your environment file:

```bash
cp .env.example .env
# set APP_ENV=development and DB_PATH=absolute/path/to/database/app.db
```

Run the dev server:

```bash
composer start
# Now visit http://localhost:8080
```

### ✅ Development Tips
* All endpoints return JSON. Use Content-Type: application/json.
* Always begin files with:
```php

<?php
declare(strict_types=1);
```

* Keep logic out of controllers. Push it into services and repositories.
* DB column names use snake_case. JSON uses camelCase to match frontend.
* Use ?type for nullable types, and PDO::FETCH_CLASS to hydrate models.

🧪 Example cURL Commands
```bash
# Create a habit
curl -X POST http://localhost:8080/habits \
     -H "Content-Type: application/json" \
     -d '{"name":"Exercise", "goal_per_day":1}'

# Log an entry
curl -X POST http://localhost:8080/habits/1/entries

# Get habits
curl http://localhost:8080/habits
```
