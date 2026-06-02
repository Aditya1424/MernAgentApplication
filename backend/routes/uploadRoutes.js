const express = require("express");

const router =
  express.Router();

const upload = require(
  "../middleware/uploadMiddleware"
);

const {
  uploadFile,
  getTasks
} = require(
  "../controllers/uploadController"
);

const {
  protect
} = require(
  "../middleware/authMiddleware"
);

router.post(
  "/",
  protect,
  upload.single("file"),
  uploadFile
);

router.get(
  "/tasks",
  protect,
  getTasks
);

module.exports = router;