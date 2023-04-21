const Router = require('express').Router
const router = Router();
const data = require('../data');
const sessionData = data.sessions;
const validation = require('../data/validation');

const arraysEqual = (arr1, arr2) => arr1.length === arr2.length && arr1.every((e, i) => e === arr2[i]);


router
  .route('/:id')
  .get(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id, 'ID URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const session = await sessionData.readSession(req.params.id);
      res.json(session);
    } catch (e) {
      res.status(404).json({error: e});
    }
  })
  .put(async (req, res) => {
    // name, start, end, isPrivate, host, guests, password
    const updatedData = req.body;
    try {
      req.params.id = validation.checkId(req.params.id, 'ID url param');
      updatedData.name = validation.checkString(updatedData.name, 'Name');
      updatedData.start = validation.checkDate(updatedData.start, 'Start Date');
      updatedData.end = validation.checkDate(updatedData.end, 'End Date');
      updatedData.isPrivate = validation.checkBoolean(updatedData.isPrivate);
      updatedData.host = validation.checkString(updatedData.host, 'Host');
      updatedData.guests = validation.checkStringArray(updatedData.guests, 'Guests');
      if (updatedData.isPrivate) {
        updatedData.password = validation.checkString(updatedData.password, "Password");
      } else {
        updatedData.password = null;
      }
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      await sessionData.readSession(req.params.id);
    } catch (e) {
      return res.status(404).json({error: 'Session not found'});
    }

    try {
      const updatedSession = await sessionData.updateSession(req.params.id, updatedData);
      res.json(updatedSession);
    } catch (e) {
      res.status(500).json({error: e});
    }
  })
  .patch(async (req, res) => {
    // name, start, end, isPrivate, host, guests, password
    const requestBody = req.body;
    let updatedObject = {};
    try {
      req.params.id = validation.checkId(req.params.id, 'ID url param');
      if (requestBody.name)
        requestBody.name = validation.checkString(requestBody.name, 'Name');
      if (requestBody.start)
        requestBody.start = validation.checkDate(requestBody.start, 'Start Date');
      if (requestBody.end)
        requestBody.end = validation.checkDate(requestBody.end, 'End Date');
      if (requestBody.isPrivate)
        requestBody.isPrivate = validation.checkBoolean(requestBody.isPrivate);
      if (requestBody.host)
        requestBody.host = validation.checkString(requestBody.host, 'Host');
      if (requestBody.guests)
        requestBody.guests = validation.checkStringArray(requestBody.guests, 'Guests');
      if (requestBody.password)
        requestBody.password = validation.checkString(requestBody.password, "Password");
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const old = await sessionData.readSession(req.params.id);
      if (requestBody.name && requestBody.name !== old.name)
        updatedObject.name = requestBody.name;
      if (requestBody.start && requestBody.start !== old.start)
        updatedObject.start = requestBody.start;
      if (requestBody.end && requestBody.end !== old.end)
        updatedObject.end = requestBody.end;
      updatedObject.isPrivate = requestBody.isPrivate;
      if (requestBody.host && requestBody.host !== old.host)
        updatedObject.host = requestBody.host;
      if (requestBody.password && requestBody.password !== old.password)
        updatedObject.password = requestBody.password;
      if (requestBody.guests && !arraysEqual(requestBody.guests, old.guests))
        updatedObject.guests = requestBody.guests;
    } catch (e) {
      return res.status(404).json({error: 'Session not found'});
    }
    if (Object.keys(updatedObject).length !== 0) {
      try {
        const updatedSession = await sessionData.updateSession(req.params.id,updatedObject);
        res.json(updatedSession);
      } catch (e) {
        res.status(500).json({error: e});
      }
    } else {
      res.status(400).json({
        error:
          'No fields have been changed from their inital values, so no update has occurred'
      });
    }
  })
  .delete(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id, 'ID URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      await sessionData.readSession(req.params.id);
    } catch (e) {
      return res.status(404).json({error: 'Session not found'});
    }
    try {
      await sessionData.deleteSession(req.params.id);
      res.status(200).json({deleted: true});
    } catch (e) {
      res.status(500).json({error: e});
    }
  });

router
  .route('/')
  .get(async (req, res) => {
    try {
      const list = await sessionData.getAllSessions();
      
      res.json(list.map(({_id, name}) => ({_id, name})));
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .post(async (req, res) => {
    const rData = req.body;
    try {
      req.params.id = validation.checkId(req.params.id, 'ID url param');
      rData.name = validation.checkString(rData.name, 'Name');
      rData.start = validation.checkDate(rData.start, 'Start Date');
      rData.end = validation.checkDate(rData.end, 'End Date');
      rData.isPrivate = validation.checkBoolean(rData.isPrivate);
      rData.host = validation.checkString(rData.host, 'Host');
      //rData.guests = validation.checkStringArray(rData.guests, 'Guests');
      if (rData.isPrivate) {
        rData.password = validation.checkString(rData.password, "Password");
      } else {
        rData.password = null;
      }
    } catch (e) {
      return res.status(401).json({error: e});
    }
    //name, start, end, isPrivate, host, guests, password
    try {
      const {name, start, end, isPrivate, host, password} = rData;
      const newSession = await sessionData.createSession(name, start, end, isPrivate, host, password);
      res.json(newSession);
    } catch (e) {
      res.status(500).json({error: e});
    }
  });

  module.exports = router