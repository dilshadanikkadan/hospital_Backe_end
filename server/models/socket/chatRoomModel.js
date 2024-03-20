import mongoose from "mongoose"

const chatRoom = mongoose.Schema({
    participants:{
        type:Array 
    }
},{ timestamps: true})

const ChatRoom = mongoose.model("ChatRoom",chatRoom)

export default ChatRoom