//jshint esversion:6

const mongoose=require('mongoose');
const { Schema } = mongoose;
const notes = require('./Notes');
const MemberSchema = new Schema({
department_name:{
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
},
 file: notes,
 leaveApplication: notes
});
const Member=mongoose.model('department',MemberSchema);
Member.createIndexes();
module.exports=Member;

