const multer = require('multer');
const DatauriParser = require('datauri/parser');
const path = require('path');
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
const parser = new DatauriParser();
const dataUri = (req) => {
  return parser.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  );
};
module.exports = { upload, dataUri };
