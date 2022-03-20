//jshint esversion:6

const mongoose=require('mongoose');
const { Schema } = mongoose;

const DepartmentSchema = new Schema({
 name:{
     type:String,
     required:true
 },
 head:{
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
const Department=mongoose.model('department',DepartmentSchema);
Department.createIndexes();
module.exports=Department;

