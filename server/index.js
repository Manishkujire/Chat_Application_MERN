const express=require("express")
const cors=require("cors")
const mongoose = require("mongoose")
const userRoute = require("./Routes/userRoutes")
const chatRoute = require("./Routes/chatRoutes")
const messageRoute = require("./Routes/messageRoutes")
const bodyparser=require("body-parser")


const app = express();
require("dotenv").config()
app.use(express.json());
app.use(cors());



app.use("/api/users",userRoute)
app.use("/api/chats",chatRoute)
app.use("/api/messages",messageRoute)




// app.use(bodyparser.json())
// app.use(bodyparser.urlencoded({extended:true}))
app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});


const port = process.env.PORT || 5000;
const uri = process.env.ATLASS_URI

app.listen(port, () => {
  console.log("Server is running at http://localhost:" + port);
})



mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("mongoose connected")
}).catch((err)=>{
  
    console.log("error: ",err.message)
})
