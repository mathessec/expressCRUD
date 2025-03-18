import express from  'express';
import recipeController from '../controller/recipe.js'
const router=express.Router()

router.post('/createRecipe',recipeController.createRecipe)
router.get('/getAllRecipes',recipeController.getAllRecipes)
router.get('/getRecipeById/:id',recipeController.getRecipeById)
export default router