# PHP REST API

This folder contains a Slim 4 REST API used by the frontend.

## Setup

1. Install PHP dependencies:

```bash
composer install
```

2. Create a `.env` file based on `.env.example` and update the database credentials.
3. Create the MySQL database using `database/schema.sql`.

## Running

```bash
composer start
```

The API will be available at `http://localhost:8080`.

## Example Requests

Create value bins:

```bash
curl -X POST http://localhost:8080/api/v1/bins \
  -H 'Content-Type: application/json' \
  -d '{"items":[{"value":"Honesty","bin":1}]}'
```

Submit clusters:

```bash
curl -X POST http://localhost:8080/api/v1/clusters \
  -H 'Content-Type: application/json' \
  -d '{"clusters":[{"name":"Core","values":["Honesty","Integrity"]}]}'
```

Submit prompt answers:

```bash
curl -X POST http://localhost:8080/api/v1/prompts \
  -H 'Content-Type: application/json' \
  -d '{"q1":"A memory","q2":"A hero","q3":"Situations"}'
```

Submit refinement:

```bash
curl -X POST http://localhost:8080/api/v1/refinements \
  -H 'Content-Type: application/json' \
  -d '{"cluster":0,"name":"Growth","q1":"My definition"}'
```
