const mongoosse = require("mongoose");

const messageSchema = new mongoosse.Schema({
    sender: {
        type: mongoosse.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoosse.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoosse.model("Message", messageSchema);

module.exports=Message