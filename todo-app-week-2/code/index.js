const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

app.set("view engine", "ejs");

app.use("/static", express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('todo.ejs');
});

app.post('/',(req, res) => {
    console.log(req.body);
});

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () => {
    console.log("Connected to database!");
    app.listen(3000, () => console.log("Server up and running!"));
});


