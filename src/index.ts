import { io } from "socket.io-client";
const WS_URL = "ws://bt-21-playground-vppfc.ondigitalocean.app/";
const socket = io(WS_URL);
socket.on("connect", () => {
   socket.on("new_message", (username, message) => {
      console.log(`${username} ${message}`);
   });
});
// const message = document.getElementById("massage");
socket.emit("send_message", "Andrii", "Hi to all");
