const mongoose=require('mongoose');
const mongoURL="mongodb://localhost:27017/notebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMongo =  ()=>
{
mongoose.connect(mongoURL,()=>
{
  console.log("Connected TO Mongo Successfully");  //Asynchronus Working Of function
})
}

module.exports=connectToMongo;