

// comando para establecer la conexion
var socket = io();

var label = $("#lblNuevoTicket");

socket.on("connect", function() {
    console.log("conectado la server");
    
})

socket.on("disconnect", function () {
    console.log("desconectado la server");

})

//escuchar lo que envia el server(ultimo ticket)
socket.on("estadoActual", function(resp) {
    console.log(resp);
    
    label.text(resp.actual)
})

$("button").on("click", function() {
    socket.emit("siguienteTicket", null, function(siguienteTicket) {
        
    label.text(siguienteTicket);

    });
})