const express = require('express');
const router = express.Router();
const Usercontroller = require("../controllers/user");

router.post('/registerUser',Usercontroller.registerUser);

router.get('/listUser/:name?',Usercontroller.listUser);

module.exports = router;