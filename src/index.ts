import { io } from "socket.io-client";

const WS_URL = "ws://bt-21-playground-vppfc.ondigitalocean.app/";

const socket = io(WS_URL);
const connectedUsers: Record<string, string> = {};
const btnReg = document.getElementById("btn-reg");
const chatContainer = document.getElementById("page-content");
const registrationContainer = document.getElementById("block");
let userName: string;
btnReg.addEventListener("click", () => {
   userName = (<HTMLInputElement>document.getElementById("floatingInput"))
      .value;
   console.log(userName);

   registrationContainer.style.display = "none";
   chatContainer.style.display = "block";
});
const addMessage = (userName: string, message: string): void => {
   const date = new Date();
};
// socket.on("connect", () => {
//    const chat = document.getElementById("chat");
//    socket.on("new_message", (username, message) => {
//       const date = new Date();
//       const messageContainer = document.createElement("div");
//       messageContainer.classList.add("message-container");
//       const userContainer = document.createElement("p");
//       const messageText = document.createElement("p");
//       userContainer.textContent =
//          date.getHours() + ":" + date.getMinutes() + " " + username + " :";
//       messageText.textContent = message;
//       messageContainer.append(userContainer, messageText);
//       chat.append(messageContainer);
//       console.log(`${username} ${message}`);
//    });
//    socket.on("new_message", (username, message, userId) => {
//       connectedUsers[userId] = username;
//       console.log(userId);
//    });
//    socket.emit("get_users");
//    socket.on("user_list", (users) => {
//       console.log("active users", users);
//    });
// });

// const name: string = "Andrii";
// const btn = document.getElementById("btn");
// btn.addEventListener("click", () => {
//    const date = new Date();
//    const text = (<HTMLInputElement>document.getElementById("message")).value;
//    const chat = document.getElementById("chat");
//    const messageContainer = document.createElement("div");
//    messageContainer.classList.add("message-container");
//    const userContainer = document.createElement("p");
//    const messageText = document.createElement("p");
//    userContainer.textContent =
//       date.getHours() + ":" + date.getMinutes() + " " + name + " : ";
//    messageText.textContent = text;
//    messageContainer.append(userContainer, messageText);
//    chat.append(messageContainer);
//    socket.emit("send_message", `${name}`, `${text}`);
// });
