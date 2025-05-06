import recipeModel from "../model/recipe.js";
import userModel from "../model/user.js";

const recipeUserQuery=[
    {
        $lookup:{
            from:'users',
            localField:"userId",
            foreignField:"id",
            as:"recipeUser"
        },
    },
        {$unwind:"$recipeUser"},
        {$project:{name:1,origin:1,description:1,userId:1,id:1,author:"$recipeUser.name",email:"$recipeUser.email"}
    }
]

const getRecipeById= async (req, res) => {
    try {
      const {id} = req.params
      let recipes = await recipeModel.aggregate([...recipeUserQuery,{$match:{userId:id}}])
      // here user recieve the booelan values whether the user exist or not
      res.status(200).send({
        message:"Data Fetch Succesfully",
        data:recipes
      })
    } catch (error) {
      console.log(`Error in ${req.originalUrl}`, error.message);
      res.status(500).send({ message: error.message || "Internal Server Error" });
    }
  };

const getAllRecipes= async (req, res) => {
    try {
      let recipes = await recipeModel.aggregate(recipeUserQuery)
      // here user recieve the booelan values whether the user exist or not
      res.status(200).send({
        message:"Data Fetch Succesfully",
        data:recipes
      })
    } catch (error) {
      console.log(`Error in ${req.originalUrl}`, error.message);
      res.status(500).send({ message: error.message || "Internal Server Error" });
    }
  };

const createRecipe = async (req, res) => {
  try {
    let user = await userModel.findOne({ id: req.headers.userId });
    // here user recieve the booelan values whether the user exist or not
    if (user) {
      await recipeModel.create({...req.body,userId: req.headers.userId});
      res.status(200).send({
        message: "Recipe Added Successfully",
      })
    } else {
        res.status(400).send({message:`Invalid userId`})
    }
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

export default {
  createRecipe,
  getAllRecipes,
  getRecipeById
};
