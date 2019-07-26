 $(function() {
     var user = {}
	var socket = io()
	
	$("#chat").hide()
	$("#login").click(function() {
		user.name = $("#msg").val()
		socket.emit("user", user, (event) => {
			if(event) {
				$("#chat").fadeIn()
				$("#msg").val('')
				$("button").attr("id", "env")
				$("#uel").text('seje bem vindo')
				$("#env").text(" enviar")
				$("#msg").attr("placeholder", "digite aqui...")
			}
			else{
				alert('nome de usuario já esrá em uso no chat')
			}
		})
	})
			
	
	socket.on('connect', () => {
		$("#on").text("você está conectado.")
	})
	
	$("#msg").keypress(function(e) {
		if(e.which == 13){
			$("button").click()
		}
	})
	
	$("#env").click(function() {
		user.msg = $("#msg").val()
	    socket.emit("chat", user)
	    $("#msg").val('')
	    $("#chat")
        .animate({scrollTop: $("#chat")[0]
        .scrollHeight}, 500);
	})
	
	socket.on("users", (user) => {
		$("#chat").append(`<small>${user.name} entrou na sala</small>`)
	})
	
	socket.on("user exit", (user) =>  {
		$("#chat").append(`<small>${user.name} saiu da sala </small>`)
	})
	
	socket.on("chat", (user) => {
		$("#chat").append(`<p>${user.name}: ${user.msg}</p>`)
		   $("#chat")
        .animate({scrollTop: $("#chat")[0]
        .scrollHeight}, 500);
	
	})
	
	socket.on("disconnect", () => {
		$("#on").text("você está desconectado.")
	})
		
	
})