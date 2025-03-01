require("dotenv").config();
const express = require("express");


const app = express();
const PORT = process.env.PORT || 4001;


app.get("/", (req, res) => {
    res.send("THis is my home page ")
})
app.listen(PORT, () => {
    console.log(`port is running on ${PORT}`)
})