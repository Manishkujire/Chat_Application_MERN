const userModel = require("../Models/userModels")
const bcrypt = require("bcrypt")
const validator = require("validator")
const jwt = require("jsonwebtoken")


const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRETE_KEY
    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" })
}



const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body
        console.log(name);
        console.log(req.body);
        
        

        let user = await userModel.findOne({ email })

        if (user) return res.status(400).json("User with given email already exists")
        if (!name || !email || !password) return res.status(400).json("All fields are required!!")

        if (!validator.isEmail(email)) return res.status(400).json("Invalid email")
        if (!validator.isStrongPassword(password)) return res.status(400).json("password must be strong")

        user = new userModel({ name, email, password })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        await user.save()

        const token = createToken(user._id)

        res.status(200).json({ _id: user._id, name, email, token })
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}


const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body
        let user = await userModel.findOne({ email })
        if (!user) return res.status(400).json("Invalid Email or Password")
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) return res.status(400).json("Invalid Email or Password")
        const token = createToken(user._id)

        res.status(200).json({ _id: user._id, name: user.name, email: user.email, token })


    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const findUser = async (req, res) => {
    const userId = req.params.userId
    try {
        const user = await userModel.findById(userId)
        res.status(200).json(user)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)

    }

}
const getUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).json(users)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)

    }

}









module.exports = { registerUser, loginUser,findUser,getUsers }