const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/profileControllers");
const { verifyAccessToken } = require("../middlewares/index");


router.get("/", verifyAccessToken, getProfile);

module.exports = router;