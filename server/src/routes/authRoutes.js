import express from 'express'
import AuthController from './../controllers/AuthController'
import LockController from './../controllers/LockController'
const router = express.Router()

const baseUrl = '/auth'

router.post(baseUrl + '/login', AuthController.userLogin)
router.post(baseUrl + '/register', AuthController.userRegistration)
router.get(baseUrl + '/me', AuthController.userAuthentication)
router.post(baseUrl + '/logout',   AuthController.userLogout)
router.post(baseUrl + '/createLock',   LockController.createLock)
router.get(baseUrl + '/getUserLock',   LockController.getUserLock)
router.post(baseUrl + '/deleteUserLock',   LockController.DeleteUserLock)
router.put(baseUrl + '/editUserLock',   LockController.EditUserLock)
export default router