const JWT = require("jsonwebtoken");
const user=require('../Models/User')

fetchId=(req,res,next)=>
{
 const token=req.header('auth_token');
 if(!token)
 {
     return res.status(401).send("Access Denied")
 }
 //extracting id of user from token
 let data=JWT.verify(token,"mynameisnavneetraj")
 req.user=user.data;
//  console.log(`${data}`);
 console.log(data);
 
  next();
  
}
module.exports=fetchId;