import Bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import User from '../models/User'
import Lock from '../models/Lock'
import Helper from '../utils/helpers'
import { v4 as uuidv4 } from 'uuid';

// Import validation for registration and login
//import registerationValidation from './validations/registerationValidation'
//import loginValidation from './validations/loginValidation'


// create lock
const createLock = async (req, res) => {   
    const token = _.get(req, "headers.authorization", false)// || req.body.access_token || req.query.access_token
    if (token) {
        const decode = Helper.verifyToken(token)
        if (decode) {
            const user = await User.findOne(
                { _id: decode._id }
            )
            if (user) {
                req.body.userId = user._id;
                req.body.macId = uuidv4();
                const oldLock = await Lock.findOne({name:req.body.name})
                if(!oldLock){
                    const lock = await Lock.create(req.body)
                    return res.status(200).json({
                        status: true,
                        message: "Lock created successfully.",
                        data: lock
                    })
                }else{
                     return res.status(200).json({
                        status: true,
                        message: "Lock is already created with this name"
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

const getUserLock = async (req, res) => {   
    const token = _.get(req, "headers.authorization", false)// || req.body.access_token || req.query.access_token
    if (token) {
        const decode = Helper.verifyToken(token)
        if (decode) {
            const Locks = await Lock.find(
                { userId: decode._id }
            )
            if (Locks) {
                return res.status(200).json({
                    status: true,
                    message: "Lock found successfully.",
                    data: Locks
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

const deleteUserLock = async (req, res) => {  
    const token = _.get(req, "headers.authorization", false)// || req.body.access_token || req.query.access_token
    if (token) {
        const decode = Helper.verifyToken(token)
        if (decode) {
            const Locks = await Lock.remove(
                { _id: req.body._id }
            )
            if (Locks) {
                return res.status(200).json({
                    status: true,
                    message: "Lock deleted successfully.",
                    data: Locks
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


const editUserLock = async (req, res) => {  
    const token = _.get(req, "headers.authorization", false)// || req.body.access_token || req.query.access_token
    if (token) {
        const decode = Helper.verifyToken(token)
        if (decode) {
            const Locks = await Lock.findOne(
                { name: req.body.name , _id:{$ne:req.body._id} }
            )
            if (Locks) {
                return res.status(200).json({
                    status: true,
                    message: "Lock name already existed",
                    data: Locks
                })
            } else {
                await Lock.update({
                   _id:req.body._id
                },{$set:req.body})
                return res.status(200).send({
                    status: true,
                    message: "Lock Updated.",
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



export default {
    createLock ,
    getUserLock,
    deleteUserLock,
    editUserLock
}