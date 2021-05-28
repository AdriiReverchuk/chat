import { io } from "socket.io-client";

const WS_URL = "ws://bt-21-playground-vppfc.ondigitalocean.app/";

const socket = io(WS_URL);
const connectedUsers: Record<string, string> = {};
const btnReg = document.getElementById("btn-reg");
const chatContainer = document.getElementById("page-content");
const registrationContainer = document.getElementById("block");
let userName: string;
console.log(userName);

btnReg.addEventListener("click", () => {
   userName = (<HTMLInputElement>document.getElementById("floatingInput"))
      .value;
   console.log(userName);

   registrationContainer.style.display = "none";
   chatContainer.style.display = "block";
});
socket.on("connect", () => {
   socket.on("users_list", console.log);
   socket.on("name_error", console.error);
   socket.emit("register", "Andrii");
   socket.on("registration_completed", () => {
      console.log("I'm registered");
      socket.emit("send_message", "Hi");
   });
   socket.emit("send_message", "Hi");
   socket.emit("get_users");
   socket.on("new_user_connected", (socketId) => {
      console.log(`${socketId} connected`);
   });
   socket.on("user_registered", (username, socketId) => {
      console.log(`${socketId} registered as ${username}`);
   });
   socket.on("new_message", (message, socketId) => {
      console.log(`Message from ${socketId}: ${message}`);
   });
});

const addMessage = (
   userName: string,
   message: string,
   ifUser: boolean
): void => {
   const date = new Date();
   const chatContent = document.getElementById("chat-content");
   if (ifUser) {
      const containerChat = document.createElement("div");
      containerChat.classList.add(
         "media media-chat media-chat-reverse container-chat"
      );
      const mediaBody = document.createElement("div");
      containerChat.classList.add("media-body text-center w-100");
      const text = document.createElement("p");
      text.textContent = message;
      const meta = document.createElement("p");
      meta.innerHTML = `${date.getHours}:${date.getMinutes}:${date.getSeconds}`;
      mediaBody.append(text, meta);
      containerChat.append(mediaBody);
      chatContent.append(containerChat);
      socket.emit("send_message", `${userName}`, `${text}`);
   } else {
      const containerChat = document.createElement("div");
      containerChat.classList.add("media media-chat");
      const img = document.createElement("img");
      img.classList.add("avatar");
      img.src = "https://img.icons8.com/color/36/000000/administrator-male.png";
      const mediaBody = document.createElement("div");
      containerChat.classList.add("media-body ");
      const text = document.createElement("p");
      text.textContent = message;
      const meta = document.createElement("p");
      meta.innerHTML = `${date.getHours}:${date.getMinutes}:${date.getSeconds}`;
      mediaBody.append(text, meta);
      containerChat.append(img, mediaBody);
      chatContent.append(containerChat);
   }
};
const btnSend = document.getElementById("btn-send");
const inputValue = (<HTMLInputElement>document.getElementById("message")).value;
btnSend.addEventListener("click", () => {
   addMessage(userName, inputValue, true);
});
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
