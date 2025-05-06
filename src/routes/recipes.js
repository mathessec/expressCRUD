import express from  'express';
import recipeController from '../controller/recipe.js'
import verifyAuth from '../middleware/verifyauth.js';
const router=express.Router()

router.post('/createRecipe',verifyAuth,recipeController.createRecipe)
router.get('/getAllRecipes',verifyAuth,recipeController.getAllRecipes)
router.get('/getRecipeById/:id',verifyAuth,recipeController.getRecipeById)
export default router