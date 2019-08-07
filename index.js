const server = require("./socket/server")
const io = require("./socket/sockets")


const port = process.env.PORT || 5000

server.listen(port, () => {
	console.log(`online na porta ${port}`)
})