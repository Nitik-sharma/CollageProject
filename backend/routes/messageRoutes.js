const express = require("express");
const Message = require("../models/message");
const router = express.Router();


// send a message 
router.post("/send", async (req,res) => {
    try {
        const { sender, receiver, content } = req.body;
        if (!sender || !receiver || !content) {
     res.status(201).json({message:"All feild are required!!"})
 }
        // create a messgae 
        const newMessage = new Message({ sender, receiver, content });
       await newMessage.save();
        res.status(201).json({message:"✅ Message sent successfully",data:newMessage})
    } catch (error) {
          res.status(500).json({ message: "❌ Error sending message", error });
    }
})


// Get message between two users
router.get("/:sender/:receiver", async (req, res) => {
    try {
        const { sender, receiver } = req.params;
        const messages = await Message.find({
            $or: [
                { sender, receiver },
                {sender:sender,receiver:receiver}
            ]
        }).sort({ createdAt: 1 })
        
        res.status(201).json(messages)

    } catch (error) {
         res.status(500).json({ message: "❌ Error fetching messages", error });
    }
})

module.exports = router;