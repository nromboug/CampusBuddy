const connection = require('../config/mongoConnection');
//const {sessions, users} = require('../config/mongoCollections');
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const data = require("../data");
const sessions = data.sessions;
const main = async () => {
    const db = await connection.connectToDb();
    await db.dropDatabase();

    const s1 = await sessions.createSession("Private Event", new Date("2023-04-10T10:00:00Z"), new Date("2023-04-15T10:00:00Z"), true, "dummy1", "something123");
    const s2 = await sessions.createSession("Public Event", new Date("2023-04-10T10:00:00Z"), new Date("2023-04-15T10:00:00Z"), false, "dummy2", null);
    const s3 = await sessions.createSession("Week Long Event", new Date("2023-05-05T10:00:00Z"), new Date("2023-05-12T10:00:00Z"), false, "dummy2", null);
    const s4 = await sessions.createSession("Big Event", new Date("2023-05-05T10:00:00Z"), new Date("2023-05-12T10:00:00Z"), false, "dummy3", null);
    await sessions.updateSession(s4._id.toString(), { guests: ["dummy1", "dummy3"] });

    // initialize users

    const userCollection = await users();

    const dummy1 = {
        _id: "nT3Ncadg1iNi4ctaVRKUtE8ki9I3",
        name: "First dummy",
        username: "dummy1",
        email: "dummy1@email.com",
        goals: [],
        todo: [],
        streak: 1,
        longest: 1,
        lastLogin: {
            year: 2023,
            month: 4,
            day: 9
        },
        image: null,
        achievements: {
            makeTodo: false,
            finishTodo: false,
            makeGoal: false,
            finishGoal: false,
            createSession: false,
            joinSession: false
        }
    }

    const dummy2 = {
        _id: "kW3dELafBoUD6y2K8Hb9Zf25xZA2",
        name: "Second dummy",
        username: "dummy2",
        email: "dummy2@email.com",
        goals: [],
        todo: [],
        streak: 1,
        longest: 1,
        lastLogin: {
            year: 2023,
            month: 4,
            day: 9
        },
        image: null,
        achievements: {
            makeTodo: false,
            finishTodo: false,
            makeGoal: false,
            finishGoal: false,
            createSession: false,
            joinSession: false
        }
    }

    const dummy3 = {
        _id: "3phglUv6mqfTt9RcGXIOuoY3BZi1",
        name: "Third dummy",
        username: "dummy3",
        email: "dummy3@email.com",
        goals: [],
        todo: [],
        streak: 1,
        longest: 1,
        lastLogin: {
            year: 2023,
            month: 4,
            day: 9
        },
        image: null,
        achievements: {
            makeTodo: false,
            finishTodo: false,
            makeGoal: false,
            finishGoal: false,
            createSession: false,
            joinSession: false
        }
    }

    await userCollection.insertOne(dummy1);
    await userCollection.insertOne(dummy2);
    await userCollection.insertOne(dummy3);
    

    console.log('Done seeding database');
    await connection.closeConnection();
};

main().catch(console.log);
