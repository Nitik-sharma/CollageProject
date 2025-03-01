require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// export schema 
const User = require("./models/user");
const Message = require("./models/message");
// import routes 
const userRoute = require("./routes/userRoutes");
const messageRoute = require("./routes/messageRoutes");


const app = express();
const PORT = process.env.PORT || 4001;

mongoose.connect(process.env.MONGO_URI, {
   
}).then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));


app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("THis is my home page ")
})
app.listen(PORT, () => {
    console.log(`port is running on ${PORT}`)
})

// use routes

app.use("api/users", userRoute);
app.use("api/messages", messageRoute);