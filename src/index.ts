import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allSockets: WebSocket[] = [];

wss.on("connection", (socket) => {
    allSockets.push(socket);
    userCount = userCount + 1;
    console.log(`New user connected. Total users: ${userCount}`);
    socket.on("message", (message) => {
        console.log("message received:", message.toString());
        allSockets.forEach((s) => {
            s.send(message.toString() + ": sent from server");
        });
    });
  
});