import { MongoClient } from "mongodb";
import "dotenv/config";
import { v4 as uuid } from "uuid";

const dbName = process.env.DB_NAME;
const client = new MongoClient(process.env.DB_URL);

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
      await client.connect();
      const recipeCollection = client.db(dbName).collection("recipes");
      const {id} = req.params
      let recipes = await recipeCollection.aggregate([...recipeUserQuery,{$match:{userId:id}}]).toArray()
      // here user recieve the booelan values whether the user exist or not
      res.status(200).send({
        message:"Data Fetch Succesfully",
        data:recipes
      })
    } catch (error) {
      console.log(`Error in ${req.originalUrl}`, error);
      res.status(500).send({ message: error.message || "Internal Server Error" });
    } finally {
      client.close();
    }
  };

const getAllRecipes= async (req, res) => {
    try {
      await client.connect();
      const recipeCollection = client.db(dbName).collection("recipes");
      let recipes = await recipeCollection.aggregate(recipeUserQuery).toArray()
      // here user recieve the booelan values whether the user exist or not
      res.status(200).send({
        message:"Data Fetch Succesfully",
        data:recipes
      })
    } catch (error) {
      console.log(`Error in ${req.originalUrl}`, error);
      res.status(500).send({ message: error.message || "Internal Server Error" });
    } finally {
      client.close();
    }
  };

const createRecipe = async (req, res) => {
  try {
    await client.connect();
    const userCollection = client.db(dbName).collection("users");
    const recipeCollection = client.db(dbName).collection("recipes");
    let user = await userCollection.findOne({ id: req.body.userId });
    // here user recieve the booelan values whether the user exist or not
    if (user) {
      req.body.id = uuid();
      await recipeCollection.insertOne(req.body);
      res.status(200).send({
        message: "Recipe Added Successfully",
      })
    } else {
        res.status(400).send({message:`Invalid userId`})
    }
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  } finally {
    client.close();
  }
};

export default {
  createRecipe,
  getAllRecipes,
  getRecipeById
};
