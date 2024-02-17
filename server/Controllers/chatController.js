const chatModel = require("../Models/chatModel");






const createChat = async (req, res) => {
    console.log("createChat");


    const { firstId, secondId } = req.body
    console.log(firstId,secondId);
    
    try {
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] }
        })
        if (chat){
            return res.status(200).json(chat)
        }
        
        const newChat=new chatModel({
            members:[firstId,secondId]
        })

        const response=await newChat.save()

        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }
}


const findUserChats=async(req,res)=>{
    console.log("finduserChat");

    const {userId}=req.params

    try {

        const chats=await chatModel.find({
            members:{$in:[userId]}
        })
        res.status(200).json(chats)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }

}

const findChat = async (req, res) => {

    console.log("findChat");
    
    const { firstId, secondId } = req.params

    try {
        const chat = await chatModel.find({
            members: { $all: [firstId, secondId] }
        })
        
        return res.status(200).json(chat)
        

    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }
}

module.exports={createChat,findChat,findUserChats}