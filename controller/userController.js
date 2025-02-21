const genToken = require("../jwt/genToken")
const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs')

const registerUser = async (req, res) => {
    const { username, gmail, password } = req.body
    
    if (!username|| !gmail|| !password) {
        return res.json({mess: 'Enter all input fields'}).status(404)
    }

    try {
        const user = await userModel.findOne({ gmail })
        if (user) {
             return res.json({mess: 'User already registered'}).status(404)
        }
        const salt = bcrypt.genSaltSync(10)
        const passwordHarssed = bcrypt.hashSync(password, salt)

        const newUser = new userModel({ ...req.body, password: passwordHarssed, profile: {} })
        const userSaved = await newUser.save()
        
        const {password:_, otheruserDetails } = userSaved.toObject()
        res.json(otheruserDetails).status(200)
    } catch (error) {
        console.log(error)
    }
}

const profileUpdate = async (req, res) => {
    const tokenId = req.user.id
    const reqId = req.params.id
    const {country, phoneNumber, street, bio} = req.body
    if (tokenId === reqId) {
        try {
             await userModel.findByIdAndUpdate(tokenId, {
        $set: {
            "profile.country": country,
            "profile.phoneNumber": phoneNumber,
            "profile.street": street,
            "profile.bio": bio,         
        }
        }, {new: true})
        } catch (error) {
            console.log(error)
        }
       
    } else {
      console.log("access denied")
    }
}

const loginUser = async (req, res) => {
    const { gmail, password } = req.body
    try {
        const user = await userModel.findOne({ gmail })
        if (!user) {
             return res.json({mess: 'No user found, please register with us'}).status(404)
        }
        const compered = await bcrypt.compare(password, user.password)
        if (!compered) {
             return res.json({mess: 'Gmail or Password incorrect'}).status(404)
        }

        const token = genToken(user._id)
         const {password:_, otheruserDetails } = user.toObject()
        res
            .cookie('token', token, { httpOnly: true, sameSite: 'strict' })
            .json(otheruserDetails)
        
    } catch (error) {
        console.log(error)
    }
}

const get_Users = async (req, res) => {
    try {
        const users = await userModel.find().select('-password').populate()
        if (!users) {
            return res.json({mess: 'No user yet'}).status(404)
        }
        res.json(users).status(200)
    } catch (error) {
        
    }
}
const delete_A_User = async (req, res) => {
    const paramId = req.params.id
    const tokenId = req.user.id

    if (paramId === tokenId) {
     try {
         await userModel.findByIdAndDelete(paramId)
         res.json({mess:"User deleted successfully!"}).status(200)
     } catch (error) {
        console.log(error)
     }   
    } else {
        return res.json({mess: ' Access denied'}).status(404)
    }
}
const update_A_User = async (req, res) => {
    const paramId = req.params.id
    const tokenId = req.user.id

    if (paramId === tokenId) {
     try {
        const updatedUser = await userModel.findByIdAndUpdate(paramId, {$set: body}, {new:true}).select('-password')
         res.json(updatedUser).status(200)
     } catch (error) {
        console.log(error)
     }   
    } else {
        return res.json({mess: 'Access denied'}).status(404)
    }
}

module.exports = {registerUser, loginUser, delete_A_User, update_A_User, get_Users }