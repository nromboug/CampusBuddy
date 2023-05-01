const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const bcrypt=require('bcrypt');
const validation = require('../validation');

let exportedMethods={
    async createUser(name,username,email,password){
        try{
            name=validation.checkName(name);
            username=validation.checkUserName(username);
            password=validation.checkPassWord(password);
            email=validation.checkEmail(email);
            const usersCollection=await users();
            const findUser=await usersCollection.find({username: username}).toArray();
            if(findUser.length==0){
                const saltRounds=16;
                const hash=await bcrypt.hash(password,saltRounds);
                const holder={
                    name: name,
                    username: username,
                    email: email,
                    password: hash,
                }
                const newUser=await usersCollection.insertOne(holder);
                if(!newUser.acknowledged || !newUser.insertedId)
                {
                    throw "Error: Could not Add User"
                }
                const returnUser=await usersCollection.findOne({username: username});
                return returnUser;
            }else{
                throw "Error: There is Already A User With That UserName"
            }

        }catch(e){
            throw 'Error: '+e;
        }
    },
    async checkUser(username,password){
        username=validation.checkUserName(username);
        password=validation.checkPassWord(password);
        const usersCollection=await users();
        const findUser=await usersCollection.findOne({username: username});
        if(!findUser){
            throw "Error: Either the username or password is invalid"
        }else{
            const comparePasswords=await bcrypt.compare(password,findUser.password);
            if(comparePasswords){
                return findUser;
            }else{
                throw "Error: Either the username or password is invalid"
            }
        }
    },
    async getUser(username){
        username=validation.checkUserName(username);
        const userCollection=await users();
        const findUser=await userCollection.find({username:username});
        if(!findUser){
            throw "Error: User with given username cannot be found"
        }else{
            const holder={
                _id: findUser._id,
                username: findUser.username
            }
            return holder;
        }
    }
}

module.exports=exportedMethods;