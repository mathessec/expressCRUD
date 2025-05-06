import mongoose from "./index.js"
import { generateUUID } from "../utils/helper.js"

const recipeSchema = new mongoose.Schema({
    id:{
        type:String,
        default:function(){
            return generateUUID()
        }
    },
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    origin:{
        type:String,
        required:[true,"origin is required"]
    },
    // image:{
    //     type:String,
    //     required:[true,"image is required"]
    // },
    description:{
        type:String,
        required:[true,"description is required"]
    },
    ingredients:{
        type:Array,
        default:[]
    },
    procedure:{
        type:String,
        required:[true,"procedure is required"]
    },
    userId:{
        type:String,
        required:[true,"userId is required"]
    },
    status:{
       type:String,
       default:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
},{
    collection:'recipes',
    versionKey:false
})

export default mongoose.model('recipes',recipeSchema)