const express = require("express");
const User = require("../models/user");
const router = express.Router();


// create a new User 
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // check if user exist
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({message:" ❌ User already exists"})
        }
        // create a new user
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: "✅ User registaration  sucessfully ", user: newUser });
    } catch (error) {
        res.status(500).json({message:"❌ Error registering user",error})
    }
})


// Get all user 
router.get("/",async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message:"❌ Error fetching users",error})
    }
})

module.exports = router;