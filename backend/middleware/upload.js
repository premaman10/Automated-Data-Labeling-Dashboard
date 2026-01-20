const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/json", "text/csv"];
  const allowedExtensions = [".json", ".csv"];
  
  if (allowedTypes.includes(file.mimetype) || 
      allowedExtensions.some(ext => file.originalname.toLowerCase().endsWith(ext))) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JSON and CSV files are allowed."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

module.exports = upload;
