const http = require("http")
const fs = require("fs")
const _ = require("lodash")

const server = http.createServer((req, res) => {
  const num = _.random(0, 200)
  console.log(num)

  const greet = _.once(() => {
    console.log("Hello")
  })

  greet()
  greet()

  res.setHeader("Content-type", "text/html")

  let path = "./views/"

  switch (req.url) {
    case "/":
      path += "index.html"
      res.statusCode = 200
      break
    case "/about":
      path += "about.html"
      res.statusCode = 200
      break
    case "/about.m":
      res.statusCode = 301
      res.setHeader("Location", "/about")
      res.end()
      break
    default:
      path += "404.html"
      res.statusCode = 404
      break
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err)
      res.end()
    } else {
      // res.write(data) for multiple files
      res.end(data)
    }
  })
})

server.listen(3000, "localhost", () => {
  console.log("listen for requests from port 3000")
})