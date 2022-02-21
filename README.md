# Julian Knab Coding Challenge

This project consists of two parts, a backend and a frontend, each in a subfolder of the same name.

## Backend

The backend uses Node.js and Express. There's documentation available using SwaggerUI.

As the backend gets the data it provides by calling the APIs at blockchain.info, I decided to add a **cache** to the endpoint providing the details about one particular block from the Bitcoin blockchain. Unfortunately there was not enough time for me to implement worker_threads in Node.js to prepopulate the cache. As a result the details about a block will be fetched lazily when there's a cache miss and are then stored in the cache for the next read.

I tried to be noticed about new blocks being mined by using the **WebSocket** API at blockchain.info. I got this feature up and running but somehow the connection keeps being cut with a status of 1006. That's why there's always a call to the API with the current time to fetch the blocks of the last day.

### Install

Run `npm install` from within the backend folder to install the necessary Node packages.

### Run

The backend can be run with `npm start` or in a Docker container (see below).

### SwaggerUI

There's documentation available using SwaggerUI, reachable at `http://localhost:3000`.

## Frontend

The frontend uses Node.js and React.

### Install

Run `npm install` from within the frontend folder to install the necessary Node packages.

### Execute

The frontend can be run with `npm start` and should be reachable at `http://localhost:3001`. There's also a Dockerfile to run it in a container (see below).

### Tests

Tests can be run with `npm test`. As I'm new to testing with Jest I just added a few simple tests to see if the app doesn't crash and renders my table headers. Testing needs to be improved.

## Running with Docker

In both the backend and the frontend there's a Dockerfile. It's easiest to use the docker-compose.yml file in the root folder of the project to start both containers. Simply run `docker-compose up`.

The backend should then be reachable at `http://localhost:3000`, frontend at `http://localhost:3001`.
