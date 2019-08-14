 $(function() {
     var user = {}
	var socket = io()
	
	socket.on("usersCount", (users) => {
		count = users.length
		$("#count").text(`usuarios online(${count})`)
	})
	
	$("#chat").hide()
	login = () => {
		user.name = $("#msg").val()
		socket.emit("user", user, (event) => {
			if(event) {
				$("#chat").fadeIn()
				$("#msg").val('')
				$("#env").attr("onclick", "env()")
				$("#uel").text('seje bem vindo')
				$("#env").text(" enviar")
				$("#msg").attr("placeholder", "digite aqui...")
			}
			else{
				alert('nome de usuario já esrá em uso no chat')
			}
		})
	}
			
	socket.on('connect', () => {
		$("#on").text("você está conectado.")
	})
	
	$("#msg").keypress(function(e) {
		if(e.which == 13){
			$("button").click()
		}
	})
	
	env = () => {
		user.msg = $("#msg").val()
	    socket.emit("chat", user)
	    $("#msg").val('')
	    $("#chat")
        .animate({scrollTop: $("#chat")[0]
        .scrollHeight}, 500);
	}
	
	socket.on("users", (user) => {
		$("#chat").append(`<p><small>${user.name} entrou na sala</small></p>`)
	})
	
	socket.on("user exit", (user) =>  {
		$("#chat").append(`<p><small>${user.name} saiu da sala </small></p>`)
	})
	
	socket.on("chat", (user) => {
		$("#chat").append(`<p>${user.msgEnv}</p>`)
		   $("#chat")
        .animate({scrollTop: $("#chat")[0]
        .scrollHeight}, 500);
	
	})
	
	socket.on("disconnect", () => {
		$("#on").text("você está desconectado.")
         $("#inp").text('vc foi desconectado')
	})
		
	
})