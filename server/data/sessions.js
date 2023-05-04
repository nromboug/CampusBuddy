const mongoCollections = require('../config/mongoCollections');
const sessions = mongoCollections.sessions;
const {ObjectId} = require('mongodb');
const validation = require('./validation');
const bcrypt = require('bcrypt');

/* Create, Read, Update, and Delete Sessions */

let exportedMethods = {

  async createSession(name, start, end, isPrivate, host, password) {

    const collection = await sessions();
    const hashedPW = await bcrypt.hash(password,6);
    let newSession = {
      name: name,
      start: start,
      end: end,
      isPrivate: isPrivate, 
      host: host, 
      password: hashedPW, 
      guests: [host]
    };

    const newInsertInformation = await collection.insertOne(newSession);
    if (!newInsertInformation.insertedId) throw 'Error: Insert failed!';
    return this.readSession(newInsertInformation.insertedId.toString());
  },

  async readSession(id) {
    try {
      const collection = await sessions();
      const session = await collection.findOne({_id: new ObjectId(id)});
      if (!session) throw 'Error: Session not found';
      return session;
    } catch(e) {
      throw 'Error: '+e;
    }
  },

  async getSessionsWithUser(username) {
    const collection = await sessions();
    const session = await collection.find({ guests: { $in: [username] } }).toArray();
    if (!session) return [];
    return session;
  },
  
  async updateSession(id, updatedSession) {
    const collection = await sessions();

    const updatedSessionData = {};

    //name, start, end, isPrivate, host, guests, password
    if (updatedSession.name) {
      //validation
      updatedSessionData.name = updatedSession.name;
    }
    if (updatedSession.start) {
      //validation
      updatedSessionData.start = updatedSession.start;
    }
    if (updatedSession.end) {
      //validation
      updatedSessionData.end = updatedSession.end;
    }
    if (updatedSession.isPrivate) {
      //validation
      updatedSessionData.isPrivate = updatedSession.isPrivate;
    }
    if (updatedSession.host) {
        //validation
        updatedSessionData.host = updatedSession.host;
    }
    if (updatedSession.guests) {
        //validation
        updatedSessionData.guests = updatedSession.guests;
    }
    if (updatedSession.password) {
        //validation
        updatedSessionData.password = updatedSession.password;
    }

    await collection.updateOne(
      {_id: new ObjectId(id)},
      {$set: updatedSessionData}
    );

    return await this.readSession(id);
  },

  async deleteSession(id) {
    //id = checkId(id, 'ID');
    const collection = await sessions();

    try {
      const session = await this.readSession(id);
    } catch (e) {
      console.log(e);
      return;
    }
    const deletionInfo = await collection.deleteOne({_id: new ObjectId(id)});
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete session with id of ${id}`;
    }
    return true;
  }, 

  async getAllSessions() {
    const collection = await sessions();
    return await collection.find({}).toArray();
  },
  async checkSession(id,password){
    const collection = await sessions();
    const session = await collection.findOne({_id: new ObjectId(id)});
    if (!session) throw 'Error: Session not found';
    const comparePasswords=await bcrypt.compare(password,session.password);
    if (comparePasswords) {
      return {valid: true};
    } else {
      return {valid: false};
    }
},
};

module.exports = exportedMethods;