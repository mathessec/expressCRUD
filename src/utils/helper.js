import {v4 as uuid} from "uuid";

const generateUUID=()=>{
  return uuid()
}

const generateRandomString = (length) => {
  const characters = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm"

  let str = ""

  for (let i = 0; i < length; i++) 
    str += characters[Math.floor(Math.random() * 100) % 62]
 
 return str
}

export {generateRandomString,generateUUID}
