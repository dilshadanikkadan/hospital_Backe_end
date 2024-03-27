import ChatRoom from '../../models/socket/chatRoomModel.js'
import MessageModel from '../../models/socket//messageModel.js'
import mongoose from 'mongoose'
import Appointment from '../../models/AppointmentModel.js'
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

export const getRoom = async (req, res) => {
    try {
        const response = await ChatRoom.find({ participants: { $in: [req.params.id] } });
        res.status(200).json(response)
    } catch (error) {
        console.log(error);

    }
}

export const createMessage = async (req, res) => {

    const { sender, chatRoom, text, typeOfMessage } = req.body;
    try {
        const newmessage = new MessageModel({
            sender,
            chatRoom,
            text,
            typeOfMessage
        })


        const response = await newmessage.save();

        let lastMessageText = text;

        if (typeOfMessage === "audio") {
            lastMessageText = "Voice message";
        } else if (typeOfMessage === "pdf") {
            lastMessageText = "PDF file";
        }

        const update = await ChatRoom.findByIdAndUpdate(chatRoom, { $push: { lastMessage: { text: lastMessageText, time: Date.now(), sender: sender } } }, { new: true });
        const updateSecond = await ChatRoom.findByIdAndUpdate(chatRoom, { $set: { messageLast: { text: lastMessageText, time: Date.now(), sender: sender } } }, { new: true })

        res.status(200).json(response)
    } catch (error) {
        console.log(error);
    }
}

export const getMessages = async (req, res) => {

    try {
        const chatRoomId = mongoose.Types.ObjectId(req.params.id.trim());
        const response = await MessageModel.find({ chatRoom: chatRoomId }).populate("chatRoom")

        res.status(200).json(response)

    } catch (error) {
        console.error('Error fetching messages:', error.message || error.stack);
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const deleteEveryOne = async (req, res) => {

    try {
        const response = await MessageModel.findByIdAndDelete(req.params.id);

        res.status(200).json("message has been deleted ")

    } catch (error) {
        console.log(error);

    }
}

export const deleteForMe = async (req, res) => {
    try {
        const update = await MessageModel.findByIdAndUpdate(req.params.id, { $set: { deleteForMe: "true" } });

        res.status(200).json("message has been deleted  from you")
    } catch (error) {
        console.log(error);
    }
}


export const readMessage = async (req, res) => {

    const { chatRoom } = req.body
    try {
        const chatRoomDoc = await ChatRoom.findById(chatRoom);
        const lastMessageArray = chatRoomDoc.lastMessage;
        const lastMessageObject = lastMessageArray[lastMessageArray.length - 1]

        const updateObject = {
            $set: {

                lastMessage: []
            }
        };
        const update = await ChatRoom.findByIdAndUpdate(chatRoom, updateObject, { new: true });
        res.status(200).json("message has been updated  from you")

    } catch (error) {
        console.log(error);
    }
}


export const deleteChat = async (req, res) => {
    try {
        const chatDelete = await ChatRoom.findByIdAndDelete(req.params.id);
        return res.status(200).json("deleted chat successfully")
    } catch (error) {

    }
}