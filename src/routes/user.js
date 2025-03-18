import express from  'express';
const router=express.Router()
import userController from '../controller/user.js'

router.get('/getAllUsers',userController.getAllUsers)
router.post('/createUser',userController.createUser)
router.get('/getUserById/:id',userController.getUserById)
router.put("/editUserId/:id",userController.editUserById)
router.delete("/deleteUserById/:id",userController.deleteUserById)

export default router