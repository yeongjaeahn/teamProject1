const multer = require("multer");
const path = require("path");

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/gif" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/svg+xml" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    req.fileValidationError =
      "jpg, jpeg, png, gif, webp, svg 파일만 업로드 가능합니다.";
    cb(null, false);
  }
};

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      done(null, "src/uploads");
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      // aaa.txt => aaa+&&+1293949.txt
      const fileName = path.basename(file.originalname, ext) + Date.now() + ext;
      done(null, fileName);
    },
  }),
  fileFilter: fileFilter,
  limits: { fileSize: 30 * 1024 * 1024 },
});

module.exports = { upload };
