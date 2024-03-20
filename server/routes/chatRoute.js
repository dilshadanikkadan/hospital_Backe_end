import express from 'express';

import { verifyAdmin, verifyDoctor, verifyToken, verifyUser } from '../utils/verifyToken.js';
import {createRoom,getRoom,getMessages,createMessage} from '../controller/chatController/chatRoomcontroller.js';

const router = express.Router();


router.post("/createRoom",createRoom)
router.get("/getRoom/:id",getRoom)


router.post('/createMessage',createMessage)
router.get('/getMessages/:id',getMessages)
export default router; 