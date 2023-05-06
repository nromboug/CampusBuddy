const mongoCollections = require('../config/mongoCollections');
const sessions = mongoCollections.sessions;
const {ObjectId} = require('mongodb');
const validation = require('./validation');
const bcrypt = require('bcrypt');

/* Create, Read, Update, and Delete Sessions */

let exportedMethods = {

  async createSession(name, start, end, isPrivate, host, password) {

    name = validation.checkString(name, 'Name');
    start = validation.checkDate(start, 'Start Date');
    end = validation.checkDate(end, 'End Date');
    isPrivate = validation.checkBoolean(isPrivate);
    host = validation.checkString(host, 'Host')
    if (password) {
      password = validation.checkString(password, "Password");
    } 
    
    const collection = await sessions();
    let newSession = {
      name: name,
      start: start,
      end: end,
      isPrivate: isPrivate, 
      host: host, 
      password: password ? await bcrypt.hash(password,6) : null, 
      guests: [host]
    };

    const newInsertInformation = await collection.insertOne(newSession);
    if (!newInsertInformation.insertedId) throw 'Error: Insert failed!';
    return this.readSession(newInsertInformation.insertedId.toString());
  },

  async readSession(id) {
    try {
      id = validation.checkId(id);
      const collection = await sessions();
      const session = await collection.findOne({_id: new ObjectId(id)});
      if (!session) throw 'Error: Session not found';
      return session;
    } catch(e) {
      throw 'Error: '+e;
    }
  },

  async getSessionsWithUser(username) {
    username = validation.checkString(username);
    const collection = await sessions();
    const session = await collection.find({ guests: { $in: [username] } }).toArray();
    if (!session) return [];
    return session;
  },
  
  async updateSession(id, updatedSession) {

    id = validation.checkId(id);
    const collection = await sessions();

    const updatedSessionData = {};

    //name, start, end, isPrivate, host, guests, password
    if (updatedSession.name) {
      updatedSessionData.name = validation.checkString(updatedSession.name, 'Name');
    }
    if (updatedSession.start) {
      updatedSessionData.start = validation.checkDate(updatedSession.start, 'Start Date');
    }
    if (updatedSession.end) {
      updatedSessionData.end = validation.checkDate(updatedSession.end, 'End Date');
    }
    if (updatedSession.isPrivate) {
      updatedSessionData.isPrivate = validation.checkBoolean(updatedSession.isPrivate);
    }
    if (updatedSession.host) {
      updatedSessionData.host = validation.checkString(updatedSession.host, 'Host');
    }
    if (updatedSession.guests) {
      updatedSessionData.guests = validation.checkStringArray(updatedSession.guests, 'Guests');
    }
    if (updatedSession.password) {
      updatedSessionData.password = validation.checkString(updatedSession.password, "Password");
    } 

    await collection.updateOne(
      {_id: new ObjectId(id)},
      {$set: updatedSessionData}
    );

    return await this.readSession(id);
  },

  async deleteSession(id) {
    id = validation.checkId(id);
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
    id = validation.checkId(id);
    password = validation.checkString(password);
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