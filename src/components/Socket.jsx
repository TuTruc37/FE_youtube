// rfc câu lệnh export function (caumonent) react
import React from "react";
import { io } from "socket.io-client";

// tạo đối tượng client cho FE
const socket = io("ws://localhost:8080");
// const socket = io.connect("http://localhost:8080");
// const socket = io("http://localhost:8080");

// on: nhận
// emit: bắn dữ liệu
socket.on("send-new-number", (data) => {
  // data : là number được truyền vào
  document.getElementById("noiDung").innerHTML = data;
});
export default function Socket() {
  return (
    <div className="text-white">
      <button
        onClick={() => {
          // "" thứ 2 là data
          socket.emit("send-click", "");
        }}
      >
        Click
      </button>
      <p id="noiDung">0</p>
      <button id="reduceNumber"
      onClick={()=>{
        // B1: client bắn event cho server
        socket.emit("reduce-number", "");
      }}
      >reduce number</button>
    </div>
  );
}
