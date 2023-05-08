const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const bcrypt = require('bcrypt');
const validation = require('../validation');

let exportedMethods = {
    async createUser(id, name, username, email) {
        try {
            name = validation.checkName(name);
            username = validation.checkUserName(username);
            email = validation.checkEmail(email);
            const usersCollection = await users();
            const findUser = await usersCollection.find({ _id: id }).toArray();
            const date = new Date();
            if (findUser.length == 0) {
                const holder = {
                    name: name,
                    username: username,
                    email: email,
                    _id: id,
                    goals:[], 
                    todo: [],
                    streak: 1,
                    longest: 1,
                    lastLogin: {
                        year: date.getUTCFullYear(),
                        month: date.getUTCMonth(),
                        day: date.getUTCDate()
                    },
                    image: null,
                }
                const newUser = await usersCollection.insertOne(holder);
                console.log('user', newUser);
                if (!newUser.acknowledged || !newUser.insertedId) {
                    throw "Error: Could not Add User"
                }
                const returnUser = await usersCollection.findOne({ _id: id });
                return returnUser;
            } else {
                throw "Error: There is Already A User With That UserName"
            }

        } catch (e) {
            throw 'Error: ' + e;
        }
    },
    async checkUser(username, password) {
        username = validation.checkUserName(username);
        password = validation.checkPassWord(password);
        const usersCollection = await users();
        const findUser = await usersCollection.findOne({ username: username });
        if (!findUser) {
            throw "Error: Either the username or password is invalid"
        } else {
            const comparePasswords = await bcrypt.compare(password, findUser.password);
            if (comparePasswords) {
                return findUser;
            } else {
                throw "Error: Either the username or password is invalid"
            }
        }
    },
    async getUser(username) {
        username = validation.checkUserName(username);
        const userCollection = await users();
        const findUser = await userCollection.find({ username: username });
        if (!findUser) {
            throw "Error: User with given username cannot be found"
        } else {
            const holder = {
                _id: findUser._id,
                username: findUser.username
            }
            return holder;
        }
    },
    async getUserById(uuid) {
        const userCollection = await users();
        const findUser = await userCollection.findOne({ _id: uuid });
        if (!findUser) {
            throw "Error: User with given username cannot be found"
        } else {
            return findUser;
        }
    },
    async updateStreak(id) {
        const userCollection = await users();
        const findUser = await userCollection.findOne({ _id: id });
        if (!findUser)
            throw "Error: User with given id cannot be found"

        const { year, month, day } = findUser.lastLogin;

        const date = new Date();

        if (year === date.getUTCFullYear() && month === date.getUTCMonth()) {
            if (day === date.getUTCDate())
                return { streak: 'no change' };
            if (day + 1 === date.getUTCDate()) {
                let longest = findUser.longest;
                if (findUser.streak+1 > longest)
                    longest = findUser.streak+1;
                const updated = await userCollection.updateOne(
                    { _id: id },
                    {
                        $set: {
                            streak: findUser.streak + 1, lastLogin: {
                                day: date.getUTCDate(),
                                month: date.getUTCMonth(),
                                year: date.getUTCFullYear()
                            },
                            longest: longest
                        }
                    })
                return { streak: "extended" }
            }
        }
        const updated = await userCollection.updateOne(
            { _id: id },
            {
                $set: {
                    streak: 1, lastLogin: {
                        day: date.getUTCDate(),
                        month: date.getUTCMonth(),
                        year: date.getUTCFullYear()
                    }
                }
            })
        return { streak: 'reset' };

    },
    async updateImage(id, url) {
        const userCollection = await users();
        const findUser = await userCollection.findOne({ _id: id });
        if (!findUser)
            throw "Error: User with given id cannot be found"

        const updated = await userCollection.updateOne({ _id: id }, {$set: {image: url}});
        return updated;
    }

    // async updateUser(id, name, username, email) {
    //     try {
    //         name = validation.checkName(name);
    //         username = validation.checkUserName(username);
    //         email = validation.checkEmail(email);
    //         const usersCollection = await users();
    //         const findUser = await usersCollection.find({ _id: id }).toArray();
    //         if (findUser.length == 0)
    //             throw "No user with that id.";


    //         const returnUser = await usersCollection.findOne({ _id: id });
    //         return returnUser;

    //     } catch (e) {
    //         throw 'Error: ' + e;
    //     }
    // },
}

module.exports = exportedMethods;