const express = require('express');
const router = express.Router();
const multer = require('multer');
const { identify, resize, convert } = require('imagemagick');
const path = require('path');
const data = require('../data');
const xss=require('xss');
const theusers = data.users;

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('File type not supported. Only JPEG and PNG are allowed.'), false);
  }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads')
    },
    filename: (req, file, cb) => {
      file.originalname=xss(file.originalname);
      cb(null, file.originalname)
    },
});

const upload = multer({ storage: storage, fileFilter });

const resizeImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const imagePath = path.join(__dirname, '..', req.file.path);

  identify(imagePath, (err, features) => {
    if (err) {
      return next(err);
    }

    resize({
      srcPath: imagePath,
      dstPath: imagePath,
      width: 300,
      height: 300 * features.height / features.width,
      quality: 1,
    }, (err) => {
      if (err) {
        return next(err);
      }
      req.imagePath = imagePath;
      next();
    });
  });
};

router.post('/', upload.single('file'), resizeImage, async (req, res) => {
  try {
    const url = "http://localhost:3001/uploads/"+req.file.originalname;
    theusers.updateImage(req.session.user._id, url);
    res.json({url: url, statusText: "200 Okay"});
  } catch(e) {
    res.json(e);
  }
  
});

module.exports = router;
