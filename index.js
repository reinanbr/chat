const express = require("express")
const http = require("http")
const path = require("path")
const socket = require("socket.io")
var sys = require("./system")


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
var db = []
var users = []
const server = http.createServer(app)
const io = socket(server)

io.on("connection", (socket) => {
	 
	socket.on("user", (user, fn) => {
		if(!(user.name in db)) {
			db[user.name] = user
			users = Object.values(db)
			socket.user = user
			console.log(user)
			io.emit("users", user)
			io.emit("usersCount", users)
			sys.log(`${user.name} entrou na sala`)
			fn(true)
			}
		else{
			fn(false)
		}
	})
	socket.on("chat", (user) => {
		user.msgEnv = `${sys.datta()}: ${user.name} => ${user.msg}`
		sys.log(`${user.name}: ${user.msg}`)
		io.emit("chat", user)
	})
	
	io.emit("usersCount", users)
	
    socket.on('disconnect', () => {
        if(socket.user){
           let name = socket.user.name
           io.emit("user exit", socket.user)
           delete db[name] 
           users = Object.values(db);
           io.emit("usersCount", users)
           console.log(`${name} foi desconectado`)
        }
        else{
            console.log(`bug negado`)
          }
   })
})



server.listen(port, () => {
	console.log(`online na porta ${port}`)
})