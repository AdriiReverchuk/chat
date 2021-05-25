import { io } from "socket.io-client";

const WS_URL = "ws://bt-21-playground-vppfc.ondigitalocean.app/";

const socket = io(WS_URL);

socket.on("connect", () => {
   const chat = document.getElementById("chat");
   socket.on("new_message", (username, message) => {
      const messageContainer = document.createElement("div");
      messageContainer.classList.add("message-container");
      const userContainer = document.createElement("p");
      const messageText = document.createElement("p");
      userContainer.textContent = username + " :";
      messageText.textContent = message;
      messageContainer.append(userContainer, messageText);
      chat.append(messageContainer);
      console.log(`${username} ${message}`);
   });
   socket.emit("get_users");
   socket.on("user_list", (users) => {
      console.log("active users", users);
   });
});

const name: string = "Andrii";
const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
   const text = (<HTMLInputElement>document.getElementById("message")).value;
   const chat = document.getElementById("chat");
   const messageContainer = document.createElement("div");
   messageContainer.classList.add("message-container");
   const userContainer = document.createElement("p");
   const messageText = document.createElement("p");
   userContainer.textContent = name + " :";
   messageText.textContent = text;
   messageContainer.append(userContainer, messageText);
   chat.append(messageContainer);
   socket.emit("send_message", `${name}`, `${text}`);
});
