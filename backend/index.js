require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// export schema 
const User = require("./models/user");
const Message = require("./models/message");
// import routes 
const userRoute = require("./routes/userRoutes");
const messageRoute = require("./routes/messageRoutes");
const { Socket } = require("dgram");


const app = express();
const PORT = process.env.PORT || 4001;

// create http server 
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", //frontend server 
        methods:["GET","POST"],
    }
})

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

app.use("/api/users", userRoute);
app.use("/api/messages", messageRoute);



// Socket io logic 
io.on("connection", (socket) => {
    console.log("A user conected ", socket.id)
    
    // listen for message from the client
    socket.on("sendMessage", (data) => {
        console.log("Message recieved data", data);

        // bordcast the message to all conected client
        io.emit("receivedMessage", data);
    })

    // disconnect

    socket.on("disconnect", () => {
        console.log("Disconnect user",socket.id)
    })

})
