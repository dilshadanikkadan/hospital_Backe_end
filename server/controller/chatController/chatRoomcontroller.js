import ChatRoom from '../../models/socket/chatRoomModel.js'
import MessageModel from '../../models/socket//messageModel.js'
import mongoose from 'mongoose'
export const createRoom = async (req, res) => {

    const { senderId, reciverId } = req.body
    try {
        const newConversation = new ChatRoom({
            participants: [senderId, reciverId]
        })
        const saved = await newConversation.save()
        res.status(200).json(saved)
    } catch (error) {
        console.log(error);
    } 
} 

export const getRoom = async (req,res)=>{
    try {
        const response = await ChatRoom.find({participants:{$in:[req.params.id]}});
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        
    }
}

export const createMessage = async(req,res)=>{

    const {sender,chatRoom,text} = req.body;
    try {
        const newmessage = new MessageModel({
            sender,
            chatRoom,
            text

        })

        const response = await newmessage.save();


        res.status(200).json(response)
    } catch (error) {
       console.log(error);
    }
}

export const getMessages =async (req,res)=>{

    try {
        const chatRoomId = mongoose.Types.ObjectId(req.params.id.trim()); 
        const response = await MessageModel.find({chatRoom:chatRoomId}).populate("chatRoom")
 
        res.status(200).json(response)
        
    } catch (error) {
        console.error('Error fetching messages:', error.message || error.stack);
        res.status(500).json({ error: 'Internal server error' })    }
}