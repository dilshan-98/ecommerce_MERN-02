require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))
app.use(cors())

//connect to mongoDB
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    //useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options. Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false. Please remove these options from your code.
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('Connected to Database')
})


app.get('/', (req, res) => {
    res.json({msg: "Welcome to my app"})
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port ', PORT)
})