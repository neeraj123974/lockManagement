import express from 'express'
import AuthController from './../controllers/AuthController'

const router = express.Router()

const baseUrl = '/auth'

router.post(baseUrl + '/login', AuthController.userLogin)
router.post(baseUrl + '/register', AuthController.userRegistration)
router.get(baseUrl + '/me', AuthController.userAuthentication)
router.post(baseUrl + '/logout',   AuthController.userLogout)

export default router