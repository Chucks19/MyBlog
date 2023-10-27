                            const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const PostSchema = new Schema({
       title:{type:"string", required:true}, 
       summary:{type:"string", required:true}, 
        pix:{type:"string"}, 
       text:{type:"string", required:true}, 
       userid:{type:Schema.Types.ObjectId, ref:"User"},
       userauthor: {type: "string"}
},
       {timestamps:true});

       const PostModel = model("Post", PostSchema)

module.exports = PostModel;