import { io } from "socket.io-client";

// Kết nối tới server Socket.IO (đảm bảo URL là đúng với server của bạn)
const socket = io("http://localhost:3000"); // Thay bằng URL server của bạn

// Lắng nghe sự kiện 'connect' để kiểm tra kết nối thành công
socket.on("connect", () => {
  console.log("Connected to server:", socket.id);
});

// Lắng nghe sự kiện lỗi
socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});

export default socket;
