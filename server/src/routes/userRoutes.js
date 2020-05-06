import express from 'express'

import UserController from './../controllers/UserController'
import authenticate from './../controllers/middlewares/authenticate'

const router = express.Router()

const baseUrl = ''

router.get(baseUrl + '/users', authenticate.authenticate, UserController.userList)

export default router