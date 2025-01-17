const multer = require("multer");
const path = require("path");
const fs = require("fs");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf,'audio/mp3",
    "video/mp4",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("این نوع فایل اجازه آپلود ندارد"), false);
  }
};

// تنظیم Multer
const upload = multer({
  storage,
  fileFilter,
});

// کنترلر برای آپلود فایل
const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "فایلی یافت نشد" });
    }
    res.status(200).json({
      message: "آپلود فایل با موفقیت انجام شد",
      file: req.file,
    });
  } catch (error) {
    next(error);
  }
};

const getFile = async (req, res, next) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "../uploads", filename);

    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ message: "فایلی یافت نشد" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload,
  uploadFile,
  getFile,
};
