const http = require("http")
const app = require("../routers/routers")

const server = http.createServer(app)

module.exports = server