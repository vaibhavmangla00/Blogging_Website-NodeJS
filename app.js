//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const mongoose = require("mongoose")

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://vm270400:qwe123@cluster0.aljel.mongodb.net/blogsDB?retryWrites=true&w=majority",{ useNewUrlParser: true})

const postSchema = {
    title: String,
    content: String
}

const Blog = mongoose.model("Blog",postSchema)

const posts = []

app.get("/",function (req,res) {
    Blog.find({},function (err,result) {
        
            res.render("home",{blogs:result,homeStartingContent:homeStartingContent})
        
      })  
})

app.get("/about",function (req,res) {  
    res.render("about",{aboutContent:aboutContent})
})

app.get("/contact",function (req,res) {  
    res.render("contact",{contactContent:contactContent})
})

app.get("/compose",function (req,res) {  
    res.render("compose",{homeStartingContent:homeStartingContent})
})

app.post("/compose",function (req,res) {
    const post = {
        title: req.body.title,
        content: req.body.postBody
    }
    const newBlog = new Blog({title:post.title,content:post.content})
    newBlog.save()
    res.redirect('/')
  })

app.get("/:postid",function (req,res) {
    Blog.find({},function (err,result) {
    if (result.length!=0){
        var reqid = req.params.postid
        Blog.findOne({_id:reqid},function(err,foundblog){
            console.log(foundblog)
            res.render("post",{post:foundblog})
        })
    }
    else{
        res.send("<h1>Page does't Exist</h1>")
    }
  })
})

let port = process.env.PORT
if (port==null||port==""){
  port=8080
}
app.listen(port,function () {
    console.log("Server Started")
})
