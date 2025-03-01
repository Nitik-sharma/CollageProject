const mongoosse = require("mongoose");

const messageSchema = new mongoosse.Schema({
    sender: {
        type: String,
        ref: "User",
        required: true,
    },
    reciver: {
        type: String,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        ref: "User",
        required: true,
    },
    seen: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Message = mongoosse.model("Message", messageSchema);

module.exports=Message