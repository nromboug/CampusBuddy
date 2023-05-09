const Router = require('express').Router
const router = Router();
const data = require('../data');
const sessionData = data.sessions;
const userData = require('../data/users');
const validation = require('../data/validation');
const xss=require('xss');

const arraysEqual = (arr1, arr2) => arr1.length === arr2.length && arr1.every((e, i) => e === arr2[i]);

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      req.params.id=xss(req.params.id);
      req.params.id = validation.checkId(req.params.id, 'ID URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      req.params.id=xss(req.params.id);
      const session = await sessionData.readSession(req.params.id);
      res.json(session);
    } catch (e) {
      res.status(404).json({error: e});
    }
  })
  .put(async (req, res) => {
    // name, start, end, isPrivate, host, guests, password
    //const updatedData = xss(req.body);
    try {
      req.params.id=xss(req.params.id);
      req.body.name=xss(req.body.name);
      req.body.start=xss(req.body.start);
      req.body.end=xss(req.body.end);
      req.body.isPrivate=xss(req.body.isPrivate);
      req.body.host=xss(req.body.host);
      req.body.guests=xss(req.body.guests);
      req.body.password=xss(req.body.password);
      req.body.id = validation.checkId(req.body.id, 'ID url param');
      req.body.name = validation.checkString(req.body.name, 'Name');
      req.body.start = validation.checkDate(req.body.start, 'Start Date');
      req.body.end = validation.checkDate(req.body.end, 'End Date');
      req.body.isPrivate = validation.checkBoolean(Boolean(req.body.isPrivate));
      req.body.host= validation.checkString(req.body.host, 'Host');
      //req.body.guests = validation.checkStringArray(req.body.guests, 'Guests');
      if (updatedData.isPrivate) {
        req.body.password = validation.checkString(req.body.password, "Password");
      } else {
        req.body.password = null;
      }
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      req.params.id=xss(req.params.id);
      await sessionData.readSession(req.params.id);
    } catch (e) {
      return res.status(404).json({error: 'Session not found'});
    }

    try {
      req.params.id=xss(req.params.id);
      const updatedSession = await sessionData.updateSession(req.params.id, req.body);
      res.json(updatedSession);
    } catch (e) {
      res.status(500).json({error: e});
    }
  })
  .patch(async (req, res) => {
    // name, start, end, isPrivate, host, guests, password
    //const requestBody = xss(req.body);
    let updatedObject = {};
    try {
      req.params.id=xss(req.params.id);
      req.params.id = validation.checkId(req.params.id, 'ID url param');
      if (req.body.name)
        req.body.name = validation.checkString(req.body.name, 'Name');
      if (req.body.start)
        //req.body.start=xss(req.body.start);
        req.body.start = validation.checkDate(req.body.start, 'Start Date');
      if (req.body.end)
        //req.body.end = xss(req.body.end);
        req.body.end = validation.checkDate(req.body.end, 'End Date');
      if (req.body.isPrivate)
        //req.body.isPrivate = xss(req.body.isPrivate);
        req.body.isPrivate = validation.checkBoolean(Boolean(req.body.isPrivate));
      if (req.body.host)
        //req.body.host = xss(req.body.host);
        req.body.host = validation.checkString(req.body.host, 'Host');
      if (req.body.guests)
        req.body.guests = validation.checkStringArray(req.body.guests, 'Guests');
      if (req.body.password)
        //req.body.password = xss(req.body.password);
        req.body.password = validation.checkString(req.body.password, "Password");
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      //req.params.id=xss(req.params.id);
      const old = await sessionData.readSession(req.params.id);
      if (req.body.name && req.body.name !== old.name)
        updatedObject.name = req.body.name;
      if (req.body.start && req.body.start  !== old.start)
        updatedObject.start = req.body.start;
      if (req.body.end && req.body.end !== old.end)
        updatedObject.end = req.body.end;
      updatedObject.isPrivate = req.body.isPrivate;
      if (req.body.host && req.body.host !== old.host)
        updatedObject.host = req.body.host;
      if (req.body.password && req.body.password  !== old.password)
        updatedObject.password = req.body.password;
      if (req.body.guests && !arraysEqual(req.body.guests, old.guests))
        updatedObject.guests = req.body.guests;
    } catch (e) {
      return res.status(404).json({error: 'Session not found'});
    }
    if (Object.keys(updatedObject).length !== 0) {
      try {
        //req.params.id=xss(req.params.id);
        await userData.setAchievement(req.session.user._id, 'joinSession');
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
      req.params.id=xss(req.params.id);
      req.params.id = validation.checkId(req.params.id, 'ID URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      req.params.id=xss(req.params.id);
      await sessionData.readSession(req.params.id);
    } catch (e) {
      return res.status(404).json({error: 'Session not found'});
    }
    try {
      req.params.id=xss(req.params.id);
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
      
      res.json(list);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .post(async (req, res) => {
    //const rData = xss(req.body);
    try {
      req.body.name=xss(req.body.name);
      req.body.start=xss(req.body.start);
      req.body.end=xss(req.body.end);
      req.body.isPrivate=xss(req.body.isPrivate);
      req.body.host=xss(req.body.host)
      req.body.name = validation.checkString(req.body.name, 'Name');
      req.body.start = validation.checkDate(req.body.start, 'Start Date');
      req.body.end = validation.checkDate(req.body.end, 'End Date');
      req.body.isPrivate = validation.checkBoolean(Boolean(req.body.isPrivate));
      req.body.host = validation.checkString(req.body.host, 'Host');
      //rData.guests = validation.checkStringArray(rData.guests, 'Guests');
      if (req.body.isPrivate) {
        req.body.password=xss(req.body.password);
        req.body.password = validation.checkString(req.body.password, "Password");
      } else {
        req.body.password = null;
      }
    } catch (e) {
      return res.status(401).json({error: e});
    }
    //name, start, end, isPrivate, host, guests, password
    try {
      //const {name, start, end, isPrivate, host, password} = rData;
      const newSession = await sessionData.createSession(req.body.name, req.body.start, req.body.end, req.body.isPrivate, req.body.host, req.body.password);
      await userData.setAchievement(req.session.user._id, 'createSession');
      res.json(newSession);
    } catch (e) {
      res.status(500).json({error: e});
    }
  });

  
router
.route('/user/:username')
.get(async (req, res) => {
  try {
    req.params.username=xss(req.params.username);
    req.params.username = validation.checkString(req.params.username);
    const list = await sessionData.getSessionsWithUser(req.params.username);
    res.json(list);
  } catch (e) {
    res.status(500).send(e);
  }
});

router
.route('/private/:id')
.post(async (req, res) => {
  try {
    req.body.password=xss(req.body.password);
    req.params.id=xss(req.params.id);
    req.body.password = validation.checkString(req.body.password);
    const valid = await sessionData.checkSession(req.params.id, req.body.password);
    res.json(valid);
  } catch (e) {
    res.status(500).send(e);
  }
});

  module.exports = router