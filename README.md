# CampusBuddy

## How to Set Up
### Prerequisite 
1. Ensure redis-server is running. 
2. Install ImageMagick and make sure it's added onto the system path.

### Client
1. Obtain `.env` file and place it in `\CampusBuddy\client\myapp`.
2. In `\CampusBuddy\client\myapp`, use `npm install` to install all dependencies.
3. Use `npm start` to start the client. 
4. The client should be visible on `http://localhost:3000`.

### Server
1. Obtain `adminKey.json` file and place it in `\CampusBuddy\server`.
2. In `\CampusBuddy\server`, use `npm install` to install all dependencies.
3. Use `npm run seed` to populate the database with initial data.
4. Use `npm start` to start the server.
5. The server should be hosted on `http://localhost:3001`.
