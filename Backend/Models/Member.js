/* 

department name
name
password
email
date
file
leave application

*/
//jshint esversion:6

const mongoose=require('mongoose');
const { Schema } = mongoose;

const MemberSchema = new Schema({
department_name:{
    type: String,
    required: true
}, 
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

