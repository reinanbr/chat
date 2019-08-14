const socket = require('socket.io')
const server = require('./server')
const sys = require("../system")

const io = socket(server)


var db = []
var users = []

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

        if(user.msg === "sair"){
           socket.disconnect(true)
           sys.log(`${user.name} foi expulso`)
        }
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



module.exports = io