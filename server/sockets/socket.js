const { io } = require('../server');
const {ticketControl} = require("../classes/ticket-control");

const ticket = new ticketControl;



io.on('connection', (client) => {

    client.on("siguienteTicket", (data, callback) => {

        let siguiente = ticket.siguiente();

        console.log(siguiente);
        callback(siguiente);

    });


    //emitir el ultimo ticket
    client.emit("estadoActual",{
        actual: ticket.getUltimoTicket(),
        ultimos4: ticket.getUltimos4()
    });

    client.on("atenderTicket", (data,callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: "el escritorio es necesario"
            })
        }

        let atenderTicket = ticket.atenderTicket(data.escritorio);


        callback(atenderTicket);

        //notificar cambios en los ultimos 4
        client.broadcast.emit("ultimos4", {
            ultimos4: ticket.getUltimos4()
        })

    });
    
});