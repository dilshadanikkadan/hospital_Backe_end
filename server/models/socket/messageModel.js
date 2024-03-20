import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    chatRoom: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom', required: true,
       
    },
    text: { 
        type: String, required: true
     },

    unRead: {
        type: Boolean,
        default: true,
        required: true
    },
  }, { timestamps: true });

  const MessageModel = mongoose.model("messageModel",messageSchema)

export default MessageModel