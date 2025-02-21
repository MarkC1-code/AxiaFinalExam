const cookieParser = require('cookie-parser')
const express = require('express')
const userRouter = require('./routes/userRoutes')
const mongo = require('./db/db')
require('dotenv').config()

mongo()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const port = process.env.PORT

app.use('/api', userRouter)

app.listen(port, ()=> console.log(`lisening on port ${port}`))
