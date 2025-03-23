import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUsersForSidebar= async (req, res)=>{
    try {
        const loggedUserId=req.user._id;
        const filteredUsers=await User.find({_id: {$ne: loggedUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
};


export const getMesssage=async (req,res)=>{
try {
    const {id:userToChatId}=req.params;
    const myId=req.user._id;
    const message=await Message.find({
        $or:[
            {senderId:myId, receiverId:userToChatId},
            {senderId:userToChatId, receiverId:myId}
        ]
    });
    res.status(200).json(message);
} catch (error) {
    console.error(error);
    res.status(500).json({message: "Server Error"});
}
};

export const sendMessage=async (req,res)=>{
    try {
        const {text, image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        let imageUrl;
        if(image){
            const uplooadResponse=await cloudinary.uploader.uploader(image);
            imageUrl=uplooadResponse.secure_url;
        }
        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        });
        await newMessage.save();
        res.status(200).json(newMessage);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
        
    }
};