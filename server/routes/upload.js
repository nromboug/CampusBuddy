const express = require('express');
const router = express.Router();
const multer = require('multer');
const { identify, resize, convert } = require('imagemagick');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
});

const upload = multer({ storage: storage });

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
  res.json({url: "http://localhost:3001/uploads/"+req.file.originalname, statusText: "200 Okay"});
});

module.exports = router;