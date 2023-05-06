const connection = require('../config/mongoConnection');
//const {sessions, users} = require('../config/mongoCollections');
const data = require("../data");
const users = data.users;
const sessions = data.sessions;
const main = async () => {
  const db = await connection.connectToDb();
  await db.dropDatabase();

  const s1 = await sessions.createSession("Private Event",new Date("2023-04-10T10:00:00Z"),new Date("2023-04-15T10:00:00Z"),true,"user123","something123");
  const s2 = await sessions.createSession("Public Event",new Date("2023-04-10T10:00:00Z"),new Date("2023-04-15T10:00:00Z"),false,"user123",null);
  const s3 = await sessions.createSession("Week Long Event",new Date("2023-05-05T10:00:00Z"),new Date("2023-05-12T10:00:00Z"),false,"user123",null);
  const s4 = await sessions.createSession("Big Event",new Date("2023-05-05T10:00:00Z"),new Date("2023-05-12T10:00:00Z"),false,"user123",null);
  await sessions.updateSession(s4._id.toString(), {guests: ["user123", "guest 1", "guest 2", "guest 3"]});

  // initialize users

  console.log('Done seeding database');
  await connection.closeConnection();
};

main().catch(console.log);
