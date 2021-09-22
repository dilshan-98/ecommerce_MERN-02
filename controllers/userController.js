const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userController = {
    register: async (req, res) => {
        try {
            //request details from the client body
            const {name, email, password} = req.body;

            //check for any existing users
            const user = await Users.findOne({email})

            if(user) return res.status(400).json({msg: "Email already in use!!!!"})

            if(password.length < 6){
                return res.status(400).json({msg: "Password must be more than 6 characters!!!"})
            }

            //password encryption
            const passworHash = await bcrypt.hash(password, 10)

            //assign new details of user to variable
            const newUser = new Users({
                name, email, password: passworHash
            })

            await newUser.save()

            //creating json webtoken to authenticate user
            

            res.json({msg: "Registration Successful!!!"})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}

module.exports = userController