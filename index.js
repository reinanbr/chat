var express = require("express")

var port = process.env.PORT || 8182
var app = express()

app.get('/', (req, res) => {
	res.status(200)
	res.send(`tente outra vez`)
	console.log(req.headers)
})

app.listen(port, () => {
	console.log(`online na porta ${port}`)
})