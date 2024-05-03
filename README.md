# Frontend

## Overview

Dette er frontende. Den er bygd med Nextjs 14, tailwind css og Framer motion. Vi bruker også Jest og Cypress til testing.

- **Endpoint til production**: `https://sparesti.tech/`
- **Endpoint til Docker**: `http://localhost:80`
- **Endpoint til Standalone / dev**: `http://localhost:3000`

## Getting Started

# NB! Husk å endre .env fil.

.env filen bestemmer endepunktet frontenden skal bruke for å kontakte backend. For å kontakte prod backend bruk:`https://api.sparesti.tech`
og for lokal docker-compose / api-gateway bruk: `http://localhost:8080`

#### Standalone

- NodeJS 20
- Git (to clone the repository)

#### Running as Docker

- Docker

#### Running Everything

> This is for running the whole project with the architecture that is intended for production.
> This is for running all servises as well as the frontend

- Docker
- Docker Compose

### Cloning the Repository

To clone the repository and navigate into the frontend directory, run:

```bash
git clone git@gitlab.stud.idi.ntnu.no:idatt2106_2024_11/frontend.git


cd frontend

#Remember to have valid SSH Keys to gitlab!
```

### Running dev server

```bash
npm install //for installing
npm run dev

```

### Building and Running Locally

```bash
npm install
npm run build
npm run start

```

### Docker Compose

To run AuthService as part of the full architecture localy, ensure you have Docker Compose installed and use the following command in the `Local` directory containing the `docker-compose.yml` file:

```bash
docker-compose up
```

To run the docker-compose in the backgroun use this command:

```bash
docker-compose up -d
```

The docker compose setup includes a MySql database that spins up test data. This data and this database will be different for the production database.
