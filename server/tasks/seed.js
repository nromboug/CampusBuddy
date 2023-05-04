const connection = require('../config/mongoConnection');
const {sessions, users} = require('../config/mongoCollections');

const main = async () => {
  const db = await connection.connectToDb();
  await db.dropDatabase();
  const sessionCollection = await sessions();
  const userCollection = await users();

  await sessionCollection.insertMany([
    {
      name: "Fun Event!",
      start: new Date("2023-04-10T10:00:00Z"),
      end: new Date("2023-04-15T10:00:00Z"),
      guests: ["user123", "user456", "testabc"],
      host: "user123",
      isPrivate: true,
      password: "something"
    },
    {
      name: "Not fun event (studying...)",
      start: new Date("2023-04-10T10:00:00Z"),
      end: new Date("2023-04-15T10:00:00Z"),
      guests: ["user123", "user456"],
      host: "user123",
      isPrivate: false
    }
  ]);

  /*
  await userCollection.insertMany([
    {
      _id: 1,
      name: 'Stevens Institute of Technology'
    },
    {
      _id: 2,
      name: 'Google'
    }
  ]);*/

  console.log('Done seeding database');
  await connection.closeConnection();
};

main().catch(console.log);
