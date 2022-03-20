//jshint esversion:6
const express=require('express');
const router=express.Router();
const notes=require('../Models/Notes')
const JWT = require("jsonwebtoken");

//End Point to add a  note
router.post('/addnotes',async(req,res)=>
{
    const auth_token=req.header('auth_token');
    if(!auth_token){return res.send({"Type":"Unauthorized user"})}
    let data=JWT.verify(auth_token,"mynameisnavneetraj");
    let new_notes= await notes.create(
        {   "user":data,
            "title":req.body.title,
            "description":req.body.description,
            "tag":req.body.tag
        }
    )
    res.send({"progress":"data saved","NOtes Added":new_notes})

})
//Fetch All notes
router.get('/fetchnotes',async(req,res)=>
{
    const auth_token=req.header('auth_token');
    let data=JWT.verify(auth_token,"mynameisnavneetraj");

    let all_notes=await notes.find({user:data})
    res.send({all_notes})

})
//Delete selected Notes
router.delete('/deletenote/:id',async(req,res)=>
{
    const auth_token=req.header('auth_token');
    let data=JWT.verify(auth_token,"mynameisnavneetraj");
   let get_notes=await notes.findOne({_id:req.params.id});
   if(get_notes.user!=data)
   {
       return res.status(401).send("Unauthorized Entry");
   }
   get_notes=await notes.findByIdAndDelete(req.params.id);
   return res.status(200).send({"Progress":"Note deleted","note":get_notes})

})
//Update a note
router.put('/updatenote/:id',async(req,res)=>
{
    const auth_token=req.header('auth_token');
    let data=JWT.verify(auth_token,"mynameisnavneetraj");
   let get_notes=await notes.findOne({_id:req.params.id});
   if(get_notes.user!=data)
   {
       return res.status(401).send("Unauthorized Entry cant update notes");
   }
   get_notes=await notes.findById(req.params.id);
   if(req.body.title){get_notes.title=req.body.title}
   if(req.body.description){get_notes.description=req.body.description}
   if(req.body.tag){get_notes.tag=req.body.tag}
   await get_notes.save()

   return res.status(200).send({"Progress":"Note Updated","note":get_notes})

})

module.exports=router