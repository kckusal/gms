## About

This is a simple Gym Management System web application built as part of the project for SEP401 course offered at Torrens university.

This project can be cloned in your local machine by running the command `git clone https://github.com/kckusal/gms`.

## Running the application locally

Make sure you are in the root of this project when following the instructions below.

Prerequisites:

- Node.js environment: Exact version 16.20.1 preferred (to avoid compatibility issues).
- Docker Install [**Docker**](https://www.docker.com/) in your environment.
- Yarn or NPM to manage Node packages (Yarn is used here.)

Follow the steps below to run this project locally.

1. Ensure the database service is running.

   ```
   docker-compose up
   ```

   This will run a Postgres database inside a docker container and the service will be available through host `localhost` and port `5432`.

2. Install the dependencies.

   ```
   yarn install
   ```

   This will install the dependencies for the backend.

3. Run the db migrations.

   This project is using Prisma as the ORM. To run the migrations after you have started the database, run the command `yarn run migrate`

4. Run the backend app.

   The backend is an [Express](https://expressjs.com/) application. Run the command `yarn run dev:backend` to run this application. The application is served over `localhost:3000` by default.

5. Run the frontend app.

   Navigate to the `frontend` directory: `cd frontend`, install the dependencies for frontend app: `yarn install`, and run the frontend app locally: `yarn run dev`. The frontend is served over `http://127.0.0.1:5173` (i.e. `localhost:5173`) by default.

   The frontend is built with [React](https://react.dev/) and [Chakra-UI](https://chakra-ui.com/), and bundled with [Vite](https://vitejs.dev/).
