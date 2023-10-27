const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path');
const cors = require('cors')
const Path = require('path')
const UserModel = require('./models/User');
const PostModel = require('./models/Post');

const fs = require("fs/promises")
const bcrypt = require('bcryptjs')
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken')
//const blogsroute = require("./routes/blogsRoutes")
//multer for pictures or files
const multer = require("multer")
const uploadedFile = multer({dest: 'uploads'})

var salt = bcrypt.genSaltSync(10);
const mongoo = "mongodb://0.0.0.0:27017/Blogsite"
mongoose.connect(mongoo).then(()=> app.listen(3100, ()=> { console.log("I am sure I am connected")})).catch((err)=> { console.log(err)})


//to pass credentials in the header of the request from react app, set credentials to true
app.use(cors({credentials:true, origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + "/uploads/"));

const secretkey = "abcdefghijk";


app.post('/Register', (req, res)=> {
       const {username, password} = req.body;
       const password_code = bcrypt.hashSync(password, salt)
       if (UserModel.findById((username && password_code))){
              res.json("User already registered, Login to continue")
       }else{
       const user = new UserModel({username: username, password: password_code});
       user.save().then(result => res.json("ok")).catch(err => console.log(err))
       }
       
})

app.post('/Login', async(req, res)=> {
       const {username, password} = req.body;
    const client = await UserModel.findOne({username})
     const passok = bcrypt.compareSync(password, client.password)
            if(passok){
// create a token and send a token to the broswer
jwt.sign({username, id:client._id }, secretkey, (err, token) => {
       res.cookie("token", token).json({id: client._id, username})  
});
       }else{
        res.status(400).json("wrong credentials")}      
      })


app.get('/Header', (req, res) => {

       if (req.cookies.token){
   jwt.verify(req.cookies.token, secretkey, (err, result) => {
    res.json(result)
    if (err){
      throw err;
    }
   })}
})

app.post('/logout', (req, res)=> {
    
     res.cookie("token", "").json("ok")  
})

app.post("/Profile", uploadedFile.single("pix"), (req, res)=> {
       const {originalname, destination, path} = req?.file
       const PixName =  Path.join(destination, originalname)
       fs.rename(path, PixName);

       const {title,summary, text} = req.body
       const pix = PixName
       jwt.verify(req.cookies.token, secretkey, (err, result) => {
              const {id, username} = result;
    if (err){
      throw err;
    }
    const userauthor = username;
    const userid = id
       const post = new PostModel({title, userid, userauthor, summary,pix,text})
       post.save().then(result =>{
      // res.json({title, path, summary,pix,text})
              res.json({title, userid, userauthor, summary, pix, text})
})
  
})
})

app.get("/Profile", (req, res)=> {
       PostModel.find().sort({updatedAt: -1})
       .then(result => res.json(result))
       })


app.get("/Post/:id", (req, res)=> {
      const {id} = req.params
      PostModel.findById(id).then(result => res.json(result))
     

})

app.put("/Edit/:id", uploadedFile.single("pix"), (req, res)=> {
      let PixName = null;
       if (req.file){
       const {originalname, destination, path} = req.file
       PixName =  Path.join(destination, originalname)
       fs.rename(path, PixName);
       }
       const {title,summary, text} = req.body
        
             const {id} = req.params;

   const updatepost = PostModel.findById(id);
       const pix = PixName? PixName:updatepost.pix

   updatepost.updateOne({title, summary, text, pix}).then(result => res.json("ok")).catch(err => res.json(err))

})