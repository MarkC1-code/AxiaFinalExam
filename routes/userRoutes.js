const { Router } = require("express");
const { registerUser, loginUser, delete_A_User, update_A_User, get_Users } = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");



const router = Router()

router
    .post('/user/register', registerUser)
    .post('/user/login', loginUser)
    .delete('/user/delete/:id', authMiddleware, delete_A_User)
    .put('/user/update/:id',authMiddleware, update_A_User)
    .get('/users', get_Users)

module.exports = router