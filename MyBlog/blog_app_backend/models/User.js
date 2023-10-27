const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
       username:{type:"string", unique:true, required:true}, 
       password:{type:"string", required:true}}, 
       {timestamps:true});

       const UserModel = model("User", UserSchema)

module.exports = UserModel;