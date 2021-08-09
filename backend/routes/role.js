const express = require("express");
const router = express.Router(); //this is the router that will be bringing the correct urls
const RoleController = require("../controllers/role"); //instance of the roleController


//GET POST PUT DELETE


//https://localHost:3001/api/role/registetrRole

router.post("/registerRole", RoleController.registerRole);//post sent, this takes the user to the /registerRole site


//https://localHost:3001/api/role/listRole
router.get("/listRole", RoleController.listRole);//get sent, this takes the user to the /listRole site

module.exports = router;