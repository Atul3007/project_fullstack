const express = require("express");
const { connection } = require("./config/db");
const {user_router}=require("./routes/user.route");
const {note_router}=require("./routes/notes.route");
const {authhenticate}=require("./middleware/authenticate.middleware");
const cors=require("cors");
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Welcome");
})
app.use(cors({
    origin: '*'
}));
app.use("/user",user_router); 
app.use(authhenticate);
app.use("/notes",note_router);
app.listen(4500, async () => {
    try {
        await connection;
        console.log("Connected to Db");
    } catch (error) {
        console.log(error);
        console.log("Problem in db");
    }
    console.log("4500 running");
})