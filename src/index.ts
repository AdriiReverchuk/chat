import { io } from "socket.io-client";
export interface Users {
   key: string;
}
let allUsers: Users;

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
if (userName !== undefined) {
   console.log("hi");
}
socket.on("connect", () => {
   socket.on("users_list", (users: Users) => {
      const userList = Object.keys(users);
      allUsers = users;
      userList.forEach((key) => {
         const allUsersContainer = document.getElementById("all-users");
         const registeredUsersContainer =
            document.getElementById("registered-users");
         const userString = document.createElement("p");
         userString.classList.add("card-text");
         userString.textContent = `Name: ${users[key]}, id: ${key}`;
         allUsersContainer.append(userString);
         if (users[key] !== "Anonymous") {
            const userStringSecond = document.createElement("p");
            userStringSecond.classList.add("card-text");
            userStringSecond.textContent = `Name: ${users[key]}, id: ${key}`;
            registeredUsersContainer.append(userStringSecond);
         }
      });
   });
   socket.on("name_error", console.error);
   socket.emit("register", "Andrii");
   socket.on("registration_completed", () => {
      console.log("I'm registered");
      // socket.emit("send_message", "Hi");
   });
   // socket.emit("send_message", "Hi");
   socket.emit("get_users", (user: string) => {
      console.log(user);
   });
   socket.on("new_user_connected", (socketId) => {
      console.log(`${socketId} connected`);
   });
   socket.on("user_registered", (username, socketId) => {
      Object.defineProperty(allUsers, socketId, {
         value: username,
         configurable: true,
         writable: true,
         enumerable: true,
      });
      console.log(allUsers);

      console.log(`${socketId} registered as ${username}`);
   });
   socket.on("new_message", (message, socketId) => {
      const users = Object.keys(allUsers);
      const chatContent = document.getElementById("chat-content");
      const date = new Date();
      const containerChat = document.createElement("div");
      containerChat.classList.add("media", "media-chat");
      const img = document.createElement("img");
      const block = document.createElement("div");
      block.style.display = "flex";
      block.style.flexDirection = "row-reverse";
      block.style.justifyContent = "flex-end";
      img.classList.add("avatar");
      img.src = "https://img.icons8.com/color/36/000000/administrator-male.png";
      users.forEach((key) => {
         if (key === socketId) {
            const nick = allUsers[key];
            const nickString = document.createElement("p");
            nickString.textContent = nick;
            block.append(nickString);
            console.log(socketId);
         }
      });
      block.append(img);
      const mediaBody = document.createElement("div");
      mediaBody.classList.add("media-body");
      const text = document.createElement("p");
      text.textContent = message;
      const meta = document.createElement("p");
      meta.classList.add("meta");
      meta.textContent = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      mediaBody.append(text, meta);
      containerChat.append(block, mediaBody);
      chatContent.append(containerChat);

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
         "media",
         "media-chat",
         "media-chat-reverse",
         "container-chat"
      );
      const mediaBody = document.createElement("div");
      mediaBody.classList.add("media-body", "text-center", "w-100");
      const text = document.createElement("p");
      text.textContent = message;
      const meta = document.createElement("p");
      meta.classList.add("meta");
      meta.innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      mediaBody.append(text, meta);
      containerChat.append(mediaBody);
      chatContent.append(containerChat);
      socket.emit("send_message", `${userName}`, `${text}`);
   }
};
const btnSend = document.getElementById("btn-send");

btnSend.addEventListener("click", (event: Event) => {
   let input = <HTMLInputElement>document.getElementById("message");
   addMessage(userName, input.value, true);
   socket.emit("send_message", `${userName}`, `${input.value}`);
   event.preventDefault();
   input.value = " ";
});
