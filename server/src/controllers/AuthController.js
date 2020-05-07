import Bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import _ from 'lodash'

import User from '../models/User'
import Helper from '../utils/helpers'
import Lock from '../models/Lock'
// Import validation for registration and login
//import registerationValidation from './validations/registerationValidation'
//import loginValidation from './validations/loginValidation'


// User registration and create user account
const userRegistration = async (req, res) => {
  try {
    const body = req.body
    let user = await User.findOne({ name: body.name })
    if (!user) {
         const salt = await Bcrypt.genSalt(10)
        body.password = await Bcrypt.hash(body.password, salt)
        user = await User.create(body)
        return res.status(200).json({
            status: true,
            message: "User created successfully.",
            data: user
        })
    } else {
        return res.status(200).json({
            status: false,
            message: "User already exists with this email address!!!",
            data: []
        })
    }
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
      data: ''
    })
  }
}

// login with email and password and return token
const userLogin = async (req, res)  => {
    try {
         const body = req.body
        const user = await User.findOne(
            { name: body.name },
            { createdAt: 0, updateAt: 0 }
        )
        if (user) {
            const passwordCheck = await Bcrypt.compare(body.password, user.password)
            if (passwordCheck) {
                const token = Helper.createJwtAuthToken(user)
                const users = await User.findOne(
                    { _id: user._id }                 
                )
                await User.findOneAndUpdate(
                    { _id: user._id },
                    { $set: { forgetPasswordToken: '' } }
                )
                return res.status(200).send({
                    status: true,
                    message: "Logged-in successfully.",
                    data: { token, user: users }
                })
            } else {
                return res.status(200).send({
                    status: false,
                    message: "Wrong Password. Please try again.",
                    data: {}
                })
            }
        } else {
            return res.status(200).send({
                status: false,
                message: "Username not found. Please register.",
                data: {}
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({
            status: false,
            message: error.message,
            data: []
        })
    }
}

// Convert token into user information or authentication
const userAuthentication = async (req, res) => {
	const token = _.get(req, "headers.authorization", false)// || req.body.access_token || req.query.access_token
	if (token) {
	    const decode = Helper.verifyToken(token)
	    if (decode) {
	        const user = await User.findOne(
	            { _id: decode._id, status: true },
	            { createdAt: 0, updateAt: 0, roles: 0, password: 0, status: 0, forgetPasswordToken: 0 }
	        )
	        if (user) {
	            const token = Helper.createJwtAuthToken(user)
	            return res.status(200).send({
	                status: true,
	                message: "ok",
	                data: user,
	                token: token
	            })
	        } else {
	            return res.status(400).send({
	                status: false,
	                message: "Token expire. Please Login Again.",
	                data: []
	            })
	        }
	    } else {
	        return res.status(400).send({
	            status: false,
	            message: "Token expire. Please Login Again.",
	            data: []
	        })
	    }

	} else {
	    return res.status(200).send({
	        status: false,
	        message: "Token Not Provided.",
	        data: []
	    })
	}
}

// User logout 
const userLogout = (req, res) => {
  res.status(200).send({ 
  	'response_code': 200,
  	'message': 'success',
  	'auth': false,
  	'token': null,
  	'result': 'Logout Successfully.'
   })
}

//get admin user and locks
const getUsers = async (req, res) => {   
    const token = _.get(req, "headers.authorization", false)// || req.body.access_token || req.query.access_token
    if (token) {
        const decode = Helper.verifyToken(token)
        if (decode) {
            const Users = await User.find({role:'User'})
            const Locks = await Lock.find({})
            if (Users) {
                return res.status(200).json({
                    status: true,
                    message: "Users found successfully.",
                    users: Users,
                    locks:Locks
                })
            } else {
                return res.status(400).send({
                    status: false,
                    message: "Token expire. Please Login Again.",
                    data: []
                })
            }
        } else {
            return res.status(400).send({
                status: false,
                message: "Token expire. Please Login Again.",
                data: []
            })
        }

    } else {
        return res.status(200).send({
            status: false,
            message: "Token Not Provided.",
            data: []
        })
    }
}
//delete  user by admin
const deleteUser = async (req, res) => {  
    const token = _.get(req, "headers.authorization", false)// || req.body.access_token || req.query.access_token
    if (token) {
        const decode = Helper.verifyToken(token)
        if (decode) {
            const user = await User.remove(
                { _id: req.body._id }
            )
            if (user) {
                return res.status(200).json({
                    status: true,
                    message: "User deleted successfully.",
                    data: user
                })
            } else {
                return res.status(400).send({
                    status: false,
                    message: "Token expire. Please Login Again.",
                    data: []
                })
            }
        } else {
            return res.status(400).send({
                status: false,
                message: "Token expire. Please Login Again.",
                data: []
            })
        }

    } else {
        return res.status(200).send({
            status: false,
            message: "Token Not Provided.",
            data: []
        })
    }
}

const editUser = async (req, res) => {  
    const token = _.get(req, "headers.authorization", false)// || req.body.access_token || req.query.access_token
    if (token) {
        const decode = Helper.verifyToken(token)
        if (decode) {
            const users = await User.findOne(
                { name: req.body.name , _id:{$ne:req.body._id} }
            )
            if (users) {
                return res.status(200).json({
                    status: true,
                    message: "User name already existed",
                    data: users
                })
            } else {
                await User.update({
                   _id:req.body._id
                },{$set:req.body})
                return res.status(200).send({
                    status: true,
                    message: "User Updated.",
                })
            }
        } else {
            return res.status(400).send({
                status: false,
                message: "Token expire. Please Login Again.",
                data: []
            })
        }

    } else {
        return res.status(200).send({
            status: false,
            message: "Token Not Provided.",
            data: []
        })
    }
}

const getAdmin = async (req, res) => {
    const users = await User.findOne(
        { role:'Admin' }
    )
    if (users) {
        return res.status(200).json({
            status: true,
            message: "Admin Found",
            data: users
        })
    }else{
        return res.status(200).json({
            status: true,
            message: "Admin Not Found",
            data: []
        })
    }
}


export default {
    userAuthentication,
    userRegistration, 
    userLogin,
    userLogout,
    getUsers,
    deleteUser,
    editUser,
    getAdmin
}