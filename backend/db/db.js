const mongoose = require("mongoose");

const dbConnection = async() => { //connect with the DATABASE server
    try {
        await mongoose.connect(process.env.BD_CONNECTION,{
            useNewUrlParser: true, //encrypt the info
            useFindAndModify: false, //hides all actions on the data base
            useCreateIndex: true, //creates a log with all actions perfonrmed by the user
            useUnifiedTopology: true //hides all the info executed on the mongo server  
        });
        console.log("connection with mongodb ok"); // feedback for us developers, it works for debugging
    } catch (error) {
        console.log("Error connecting with mongoDB: ", error); //error notification on console
        throw new Error("Error connecting with mongoDB"); // error notificacion when using angular
    }
};

module.exports = {dbConnection}; //should always use modules, this sends the dbConnection method when this file is invoked

