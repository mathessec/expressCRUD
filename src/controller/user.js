import { MongoClient } from "mongodb";
import "dotenv/config";
import { v4 as uuid } from 'uuid';
import { generateRandomString } from "../utils/helper.js";
//const url=process.env.DB_URL
//first we set the client
const dbName = process.env.DB_NAME;
const client = new MongoClient(process.env.DB_URL);

const getAllUsers = async (req, res) => {
  try {
    //then we estatblish the connection
    //then choosing the specific database,what collection of database
    //then we finally right query

    await client.connect();
    const userCollection = client.db(dbName).collection("users"); //accessing the user collections document
    let users = await userCollection.find().project({_id:0}).toArray(); // toarray is used to convert the data in array in form while recieving the data we will recieve in the json string format
    res.status(200).send({
      message: "Data fetched Successfully",
      data: users,
    });
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`,error);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  } finally {
    client.close();
  }
};

const getUserById = async (req, res) => {
    try {
      //then we estatblish the connection
      //then choosing the specific database,what collection of database
      //then we finally right query
      
      await client.connect();
      const userCollection = client.db(dbName).collection("users"); //accessing the user collections document
      let {id}=req.params
      let user = await userCollection.findOne({id:id},{_id:0}) // toarray is used to convert the data in array in form while recieving the data we will recieve in the json string format
      res.status(200).send({
        message: "Data fetched Successfully",
        data: user
      });
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error);
      res.status(500).send({ message: error.message || "Internal Server Error" });
    } finally {
      client.close();
    }
};

const createUser = async (req, res) => {
  try {
    await client.connect();
    const userCollection = client.db(dbName).collection("users");
    // here user recieve the booelan values whether the user exist or not
    let user = await userCollection.findOne({ email: req.body.email });
    req.body.id = uuid()
    req.body.status = true;
    if (!user) {
      await userCollection.insertOne(req.body);
      res.status(201).send({ message: "User Created Sucessfully" });
    } else {
      res.status(201).send({ message: `User ${req.body.email}  AlreadyExist` });
    }
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`,error);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  } finally {
    client.close();
  }
};

const editUserById = async (req, res) => {
    try {
      //then we estatblish the connection
      //then choosing the specific database,what collection of database
      //then we finally right query
      
      await client.connect();
      const userCollection = client.db(dbName).collection("users"); //accessing the user collections document
      let {id}=req.params
      let user = await userCollection.findOne({id:id},{_id:0}) // toarray is used to convert the data in array in form while recieving the data we will recieve in the json string format
      
      if(user){
         await userCollection.updateOne({id:id},{$set:{...user,...req.body}})
         res.status(200).send({message:"User Edited Successfully"})
      }else{
         res.status(400).send({message:"Invalid Id"})
      }

    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error);
      res.status(500).send({ message: error.message || "Internal Server Error" });
    } finally {
      client.close();
    }
};

const deleteUserById = async (req, res) => {
    try {
      //then we estatblish the connection
      //then choosing the specific database,what collection of database
      //then we finally right query
      
      await client.connect();
      const userCollection = client.db(dbName).collection("users"); //accessing the user collections document
      let {id}=req.params
      let data=await userCollection.deleteOne({id:id}) // toarray is used to convert the data in array in form while recieving the data we will recieve in the json string format
      if(data.deletedCount){
           res.status(200).send({message:"User Deleted Successfully"})
      }else{
         res.status(400).send({message:"Invalid Id"})
      }
    } catch (error) {
      console.log(`Error in ${req.originalUrl}`,error);
      res.status(500).send({ message: error.message || "Internal Server Error" });
    } finally {
      client.close();
    }
};

export default {
  getAllUsers,
  createUser,
  getUserById,
  deleteUserById,
  editUserById
};
