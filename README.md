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
   `http://localhost:8000`.

The `frontend` directory includes its own [README](frontend/README.md) with
more details about building and deploying the React application.
