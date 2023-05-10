# CampusBuddy

## How to Set Up
### Prerequisite 
1. Ensure redis-server is running. 
2. Install ImageMagick and make sure it's added onto the system path.
3. Ensure MongoDB is running locally on its default port.

#### Docker
Make sure that the docker daemon is running on your machine. Docker Desktop offers a
nice concise way to manage docker images/containers, and runs the daemon as well.
### Client (with Docker)
1. In the `\CampusBuddy\client\myapp` run `docker build -t campus-buddy .` to build a docker image of the react app. Allow a few minutes for dependencies and libraries to download.
2. Run `docker run -p 3000:3000 campus-buddy` to run the image in a container on port 3000. If you receive an error on either step regarding the docker daemon, ensure the daemon is installed and running. Docker Desktop can show the status of image builds and active containers.
3. The client should be visible on `http://localhost:3000`.

### Client (without docker)
1. Obtain `.env` file and place it in `\CampusBuddy\client\myapp` (included in project submission).
2. In `\CampusBuddy\client\myapp`, use `npm install` to install all dependencies.
3. Use `npm start` to start the client. 
4. The client should be visible on `http://localhost:3000`.

### Server
1. Obtain `adminKey.json` file and place it in `\CampusBuddy\server` (included in project submission).
2. In `\CampusBuddy\server`, use `npm install` to install all dependencies.
3. Use `npm run seed` to populate the database with initial data.
4. Use `npm start` to start the server.
5. The server should be hosted on `http://localhost:3001`.
