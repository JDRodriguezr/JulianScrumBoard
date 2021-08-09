const Role = require("../models/role")

const registerRole = async(req, res) =>{

    if(!req.bodyname.name || !req.body.description)
    return res.status(401).send("Process failed: Incomplete data, please make sure to issue a name and a description")

    const existingRole = await Role.findOne({name: req.body.name});//searches for a role with the same name
    if(existingRole) return res.status(401).send("Process failed: Role already exists");

    const role = new Role({ //this assigns a 

        name: req.body.name,
        description: req.body.description,
        dbStatus: true,

    });

    const result = await Role.save();
    if(!result) return res.status(401).send("Failed to register");//this is just a confirmation, if something goes wrong then this is displayed
    return res.status(200).send({ role });

};

const listRole = async(req, res) =>{

    const role = await Role.find();
    if(!role) return res.status(401).send("No role");
    return res.status(200).send({role});
};

module.exports = {registerRole, listRole};//functions avaiable when this file is invoked