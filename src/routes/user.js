import express from  'express';
const router=express.Router()
import verifyAuth from "../middleware/verifyauth.js"
import verifyAdmin from '../middleware/verifyAdmin.js';
import userController from '../controller/user.js'

router.get('/getAllUsers',verifyAuth,verifyAdmin,userController.getAllUsers)
router.post('/createUser',userController.createUser)
router.get('/getUserById/:id',verifyAuth,userController.getUserById)
router.put("/editUserId/:id",verifyAuth,userController.editUserById)
router.post('/login',userController.login)
router.put('/changePassword',verifyAuth,userController.changePassword)
router.delete("/deleteUserById/:id",verifyAuth,verifyAdmin,userController.deleteUserById)

export default router