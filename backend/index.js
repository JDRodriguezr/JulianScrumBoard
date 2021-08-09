const express = require("express"); //why is this not red?
const cors = require("cors"); // cors allows us to use all of that functions (get post send delete) and we will be using postman so this is why it's used this sets up the rules
//for the connection with the backend

const { dbConnection } = require("./db/db");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/role", Role);

app.listen(process.env.PORT, () => console.log("Backend server running on port: ", process.env.PORT));

dbConnection();//this connects the server with the db
