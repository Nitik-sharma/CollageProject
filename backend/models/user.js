const mongosse = require("mongoose");

const userSchema = new mongosse.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    profilePic: {
        type: String,
        default: "https://example.com/default-avatar.png"
    },

}, { timestamps: true });


const User = mongosse.model("User", userSchema);

module.exports=User