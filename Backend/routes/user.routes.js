const express = require("express");
const checkAuth = require("../middlewares/checkAuth");
const { RegisterUser, LoginUser, getAllNotes } = require("../controllers/user.controllers");

const router = express.Router();

router.post('/register', RegisterUser);
router.post('/login', LoginUser);
router.get('/notes', checkAuth, getAllNotes);

module.exports = router;