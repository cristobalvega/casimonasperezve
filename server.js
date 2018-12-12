//Import all the modules
const http = require('http')
const port = process.env.port || 3000
const app = require('./app')
const server = http.createServer(app)

//Turn on the server in localhost:3000
console.log("Server listening in localhost:" + port)
server.listen(port)
