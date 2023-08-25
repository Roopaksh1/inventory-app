const multer = require('multer');
const maxSize = 2097152;

const storage = multer.memoryStorage();
function fileFilter(req, file, cb) {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({ storage, limits: { fileSize: maxSize }, fileFilter });

module.exports = upload;
