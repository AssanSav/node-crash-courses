const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const blogRoutes = require("./routes/blogRoutes")
const app = express()
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))


const dataURL = "mongodb+srv://net-ninjas:net-ninjas@cluster0.qkfd3.mongodb.net/net-ninjas?retryWrites=true&w=majority"
mongoose.connect(dataURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err))


// Routes
app.get("/", (req, res) => {
  res.redirect("/blogs")
})

app.get("/about", (req, res) => {
  res.render("about", { title: "About" })
})

app.get("/about-us", (req, res) => {
  res.redirect("/about")
})

// blog routes 
app.use("/blogs", blogRoutes)

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "Page not found" })
})
