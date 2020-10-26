const express = require("express");
const checkAuth = require('../middlewares/checkAuth');
const { CreateNote } = require("../controllers/note.controllers");

const router = express.Router();

router.post('/create', checkAuth, CreateNote);
// router.post('/login', LoginUser);

module.exports = router;