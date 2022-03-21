//jshint esversion:6
const path = require('path');
const mongoose=require('mongoose');
const { Schema } = mongoose;
const notes = require('./Notes');
const MemberSchema = new Schema({
departmentName:{
    type: String,
    required: true
}, 
name:{
     type:String,
     required:true
 },
email:{
     type:String,
     required:true,
     unique:true
 },
password:{
    type:String,
    required:true
},
date:{
    type:Date,
    default:Date.now
}
});
const Member=mongoose.model('member',MemberSchema);
Member.createIndexes();
module.exports=Member;

