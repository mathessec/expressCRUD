import express from  'express';
const router=express.Router()
import userRoutes from './user.js'
import recipeRoutes from './recipes.js'

router.use('/user',userRoutes)
router.use('/recipes',recipeRoutes)
router.get('*',(req,res)=>res.send(`<div style="text-align-center"><h1>404 NOT FOUND</h1></div>`))

export default router
