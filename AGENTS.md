# Repo Guidelines for Agents

This repository contains a small full-stack prototype. The front end lives in
`./frontend` and uses TypeScript with React Router. The back end lives in
`./backend` and contains a PHP 8 project with Slim. There is also a production
Nginx configuration in `./nginx`.

## Development
- To spin up the entire stack locally, run `docker compose -f docker-compose.dev.yml up`.
- The front end runs at `http://localhost:5173` and the back end at `http://localhost:8001`.
- The production stack is defined in `docker-compose.prod.yml` and uses Nginx.

## Conventions
- TypeScript files use 2‑space indentation. Keep the existing style when editing.
- If you modify any files under `frontend`, run `npm run typecheck` inside that
  directory before committing to ensure the build is still valid.
- There is no dedicated test suite, so the type check acts as a basic
  correctness check.

## Pull Request Notes
Include a short summary of the changes and mention whether the type check
passed in the testing section.
