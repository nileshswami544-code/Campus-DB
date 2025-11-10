const multer = require('multer');
const path = require('path');
const config = require('../config');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;
  
  if (config.allowedFileTypes.test(extname) && config.allowedFileTypes.test(mimetype)) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, PDF, DOC, DOCX, PPT, PPTX, MP4, AVI, MOV files are allowed.'));
  }
};

const upload = multer({
  storage: storage,
  limits: { 
    fileSize: config.maxFileSize
  },
  fileFilter: fileFilter
});

module.exports = upload;