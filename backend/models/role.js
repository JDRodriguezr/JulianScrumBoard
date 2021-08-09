const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({ // this is the structure that every Role object will have

    name: String,
    description: String,
    taskStatus: String,
    imageUrl: String,
    date: {type: Date, default: Date.now},
    
});
const board = mongoose.model("board", boardSchema);

module.exports = board;