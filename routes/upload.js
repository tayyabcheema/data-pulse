const express = require("express");
const router = express.Router();
const { getPresignedUrl } = require("../controllers/uploadController");

router.post("/get-presigned-url", getPresignedUrl);

module.exports = router;
