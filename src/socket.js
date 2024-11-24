import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:3000"; // Lấy URL từ biến môi trường

const socket = io(SERVER_URL, {
  autoConnect: false, // Chỉ kết nối khi cần
  reconnectionAttempts: 5, // Thử kết nối lại tối đa 5 lần
  timeout: 10000, // Thời gian chờ kết nối (ms)
});

// Lắng nghe sự kiện 'connect' để kiểm tra kết nối thành công
socket.on("connect", () => {
  console.log("Connected to server:", socket.id);
});

// Lắng nghe sự kiện lỗi
socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});

// Xử lý khi ngắt kết nối
socket.on("disconnect", (reason) => {
  console.warn("Disconnected from server:", reason);
});

export default socket;
