
const User = require("../models/user");
const Role = require("../models/role")
const bcrypt = require("bcrypt");


const registerUser = async (req,res) => {

    if(!req.body.name || !req.body.email || !req.body.password) return res.status(401).send("Process failed: Imcomplete data");

    let existingUser = await User.findOne({email:req.body.email});

    if(existingUser) return res.status(401).send("Process failed: Email already in use")

    let hash = await bcrypt.hash(req.body.password,10);

    let role = await Role.findOne({name:"user"});

    if(!role) return res.status(401).send("Process failed: No role Was Assigned");


    let user = new User({
            name:req.body.name,
            email:req.body.email,
            password:hash,
            roleId:role._id,
            dbStatus:true,
    });

  


    let result = await user.save();

    if(!result) return res.status(401).send("Please try again");


    
    try {
        let jwt = user.generateJWT();
        return res.status(200).send({jwt});
    } catch (e) {
        return res.status(400).send("fallo al registrar los usuarios");
    }

}


const listUser = async (req,res) => {
    //el parametro el filtro por el cual va a buscar esto esta en rutas
    //el param tiene los parametros que tiene en la url , es lo qeu viene pegado a la url
    //expresion regular un nombre o algo parecido o un vacio
    //Expresion regular
    //populate
    let user = await User.find({name: new RegExp(req.params["name"],"i")}).populate("roleId").exec();

    if(!user || user.length === 0) return res.status(401).send("No hay usuarios");

    return res.status(200).send({user});


}


module.exports = {registerUser,listUser}