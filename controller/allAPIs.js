
const allAPIs = (req, res) => {
    res.json(
        {
           userRegister: '/api/user/register',
           userLogin: '/api/user/login',
           DeleteUser: '/api/user/delete/:id',
            updateuser: '/api/user/update/:id',
           getAllUsers: '/'
       }
    )
} 

module.exports = {allAPIs}