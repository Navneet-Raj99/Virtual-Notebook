const connectToMongo=require('./db')
connectToMongo();
const express=require('express');
const app=express();
var cors = require('cors')

app.use(cors())
const port=8000;

//MiddleWare To send Data in the Body Of Response
 app.use(express.json())

// app.get('/',(req,res)=>{
//  res.send("hello World")
// })

//Useable ROutes
app.use('/api/auth',require('./Routes/Auth')); //Initiator Line
app.use('/api/notes',require('./Routes/Note'));  //Initiator Line



app.listen(port,()=>
{
    console.log(`Server started at port http://localhost:${port}`);
})
