const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const Blog = require("./models/blog")
const { result } = require("lodash")
const { render } = require("ejs")
const app = express()
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))


const dataURL = "mongodb+srv://net-ninjas:net-ninjas@cluster0.qkfd3.mongodb.net/net-ninjas?retryWrites=true&w=majority"
mongoose.connect(dataURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err))


// app.get("/add-blog", (req, res) => {
//   let blog = new Blog({
//     title: "My new blog 4",
//     snippet: "About my new blog",
//     body: "Let's lean node"
//   })
//   blog.save()
//     .then(result => res.send(result))
//     .catch(err => console.log(err))
// })


app.get("/single-blog", (req, res) => {
  Blog.findById("5f9f41885797ef52206c59ce",)
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

app.get("/", (req, res) => {
  res.redirect("/blogs")
})

app.get("/blogs", (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => res.render("index", { title: "Home", blogs: result }))
    .catch(err => console.log(err))
})

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body)
  blog.save()
    .then(result => {
      res.redirect("/blogs")
    })
    .catch(err => console.log(err))
})

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" })
})

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id
  Blog.findById(id)
    .then(result => res.render("details", { blog: result, title: "Blog details" }))
    .catch(err => console.log(err))
})

app.get("/about", (req, res) => {
  res.render("about", { title: "About" })
})


app.get("/about-us", (req, res) => {
  res.redirect("/about")
})

app.use((req, res) => {
  res.status(404).render("404", { title: "Page not found" })
})
