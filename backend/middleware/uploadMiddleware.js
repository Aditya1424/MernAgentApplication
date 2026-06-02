const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (
    req,
    file,
    cb
  ) {
    cb(null, "uploads/");
  },

  filename: function (
    req,
    file,
    cb
  ) {
    cb(
      null,
      Date.now() +
        "-" +
        file.originalname
    );
  }
});

const fileFilter = (
  req,
  file,
  cb
) => {
  const allowedTypes = [
    ".csv",
    ".xls",
    ".xlsx"
  ];

  const ext = path.extname(
    file.originalname
  );

  if (
    allowedTypes.includes(
      ext.toLowerCase()
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only CSV, XLS and XLSX files are allowed"
      )
    );
  }
};

const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;