import auth from "../utils/auth.js"

const verifyAuth = async(req,res,next)=>{
    let token = req.headers?.authorization?.split(" ")[1]
    // next help to move to next token
    if(token){
        let payload = auth.decodeToken(token)
        if(payload.exp>Math.floor(+new Date()/1000)){
            req.headers.userId=payload.id
            next()
        }else{
            res.status(401).send({message:"Session Expired"})
        }
     }else{
        res.status(401).send({
           message:"No Token Found"
       })
     }
}
 
export default verifyAuth