const express = require("express")
const http = require("http")
const path = require("path")

const port = process.env.PORT || 5000
const app = express()
const index = path.join(__dirname, "public")

app.use(express.static(index))

app.get('/chat/:msg', (req, res) => {
	res.status(200)
	console.log(req.headers)
	msg = req.params.msg
	res.send(msg)
})

const server = http.createServer(app)

server.listen(port, () => {
	console.log(`online na porta ${port}`)
})