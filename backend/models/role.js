const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({ // this is the structure that every Role object will have

    name: String,
    description: String,
    taskStatus: String,
    imageUrl: String,
    date: {type: Date, default: Date.now},
    
});
const role = mongoose.model("role", roleSchema);

module.exports = role;