var express = require("express")

var port = process.env.PORT || 8182
var app = express()

app.get('/index/:msg', (req, res) => {
	res.status(200)
	msg = req.params.msg
	res.send(msg)
	console.log(req.headers)
})

app.listen(port, () => {
	console.log(`online na porta ${port}`)
})