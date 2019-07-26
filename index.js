const express = require("express")
const http = require("http")
const path = require("path")

const port = process.env.PORT || 5000
const app = express()
const index = path.join(__dirname+"/public")

app.use(express.static(index))

app.listen(port, () => {
	console.log(`online na porta ${port}`)
})