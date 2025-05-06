import mongoose from "./index.js"
import validator from "../utils/validator.js"
import {generateUUID} from '../utils/helper.js'

const userSchema = new mongoose.Schema({
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
    email:{
        type:String,
        required:[true,"Email is required"],
        validate:{
            validator:validator.validateEmail,
            message:props=>`${props.value} is not a valid email!`
        }
    },
    password:{
            type:String,
            required:true
    },
    mobile:{
        type:String,
        required:[true,"Mobile is required"],
        validate:{
            validator:validator.validateMobile,
            message:props=>`${props.value} is not a valid Mobile!`
        }
    },
    status:{
        type:Boolean,
        required:[true,"Name is required"]
    },
    role:{
    type:String,
    enum:{
        values:["admin","user"],
        message:'{VALUE} is not supported'
    },
    default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
},{
    collection:'users',
    versionKey:false
})

export default mongoose.model('users',userSchema)