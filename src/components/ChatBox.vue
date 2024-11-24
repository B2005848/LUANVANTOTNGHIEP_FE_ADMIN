<template>
  <div class="chat">
    <h2>Chat Room</h2>
    <div class="message-input">
      <input v-model="message" placeholder="Type a message..." />
      <button @click="sendMessage">Send</button>
    </div>
    <div class="messages">
      <h3>Messages:</h3>
      <ul>
        <li v-for="(msg, index) in messages" :key="index">
          <strong>{{ msg.senderId }}:</strong> {{ msg.content }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { io } from "socket.io-client";

// Kết nối tới server Socket.IO
const socket = io("http://localhost:3000");

// State quản lý tin nhắn
const message = ref("");
const messages = ref([]);

// ID người dùng hiện tại (giả lập)
const currentUserId = "1"; // Đây là ID của người dùng hiện tại
const receiverId = "2"; // Đây là ID của người nhận

// Gửi tin nhắn tới server
const sendMessage = () => {
  if (message.value.trim()) {
    const payload = {
      senderId: currentUserId,
      receiverId, // Gửi tới người nhận cụ thể
      content: message.value,
    };

    socket.emit("send_message", payload); // Phát sự kiện 'send_message' tới server
    messages.value.push(payload); // Cập nhật tin nhắn vào UI
    message.value = ""; // Reset input
  }
};

// Lắng nghe sự kiện khi component được mount
onMounted(() => {
  // Tham gia Room dựa trên ID người dùng
  socket.emit("join", currentUserId);

  // Lắng nghe tin nhắn từ server
  socket.on("receive_message", (data) => {
    messages.value.push(data); // Cập nhật danh sách tin nhắn
  });
});

// Hủy lắng nghe sự kiện khi component bị unmount
onUnmounted(() => {
  socket.off("receive_message");
});
</script>

<style scoped>
.chat {
  margin: 20px;
}
.message-input {
  margin-bottom: 10px;
}
.messages ul {
  list-style-type: none;
  padding: 0;
}
.messages li {
  margin: 5px 0;
}
</style>
