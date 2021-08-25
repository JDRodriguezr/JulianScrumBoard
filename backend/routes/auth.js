const express = require('express');
const router = express.Router();
const loginController = require('../controllers/auth');
const Auth = require('../middleware/auth');
const ValidateUser = require('../middleware/ValidateUser');


router.post("/login", loginController.login);

module.exports = router;