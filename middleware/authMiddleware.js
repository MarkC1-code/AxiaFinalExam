const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")


const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token
    const secrete = process.env.JWT_SECRET
    if (!token) {
         return res.json({mess: 'Please login to continue'}).status(404)
    }

    try {
        const verifyToken = jwt.verify(token, secrete)
        const user = await userModel.findById(verifyToken.id).select('-password')

        if (!user || !verifyToken) {
            return res.json({mess: 'Token Invalid'}).status(404)
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = authMiddleware