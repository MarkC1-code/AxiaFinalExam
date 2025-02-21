const { Router } = require("express");
const  allApis  = require("../controller/allAPIs");


const router = Router()

router
    .get('/', allApis)

module.exports = router