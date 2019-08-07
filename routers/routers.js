const express = require("express")
const path = require("path")

const app = express()
const index = path.join(__dirname, "public")

app.use(express.static(index))

app.get('/chat/:msg', (req, res) => {
	res.status(200)
	console.log(req.headers)
	msg = req.params.msg
	res.send(msg)
})




module.exports = app