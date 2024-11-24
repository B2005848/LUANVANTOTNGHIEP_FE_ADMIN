<template>
  <div class="chat-list-container">
    <h2>ĐOẠN CHAT</h2>
    <div class="chat-list">
      <ul>
        <li
          v-for="contact in chatPairs"
          :key="contact.contact_id"
          @click="selectChat(contact.contact_id)"
          class="chat-item"
        >
          <div class="chat-info">
            <strong>{{ contact.contact_id }}</strong>
            <p>{{ contact.last_message }}</p>
          </div>
          <span class="timestamp">{{ formatDateTime(contact.timestamp) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import Cookies from "js-cookie"; // Import thư viện js-cookie
import { io } from "socket.io-client"; // Import Socket.IO client
import { useRouter } from "vue-router";
import formatDate from "@/helper/format-datetime";
const formatDateTime = formatDate.formatDateTime;
const router = useRouter();
// Lấy ID người gửi từ cookie
const senderId = Cookies.get("staffId");

if (!senderId) {
  console.error("SenderId not found in cookies!");
}

// State quản lý danh sách cặp hội thoại
const chatPairs = ref([]); // Danh sách các cặp hội thoại

// Tạo kết nối với server qua Socket.IO
const socket = io("http://localhost:3000");

// Hàm gọi API lấy danh sách cặp hội thoại
const fetchChatPairs = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/messages/chatPairs",
      {
        params: { senderId },
      }
    );

    if (response.data.status) {
      chatPairs.value = response.data.data.map((item) => ({
        contact_id: item.contact_id,
        last_message: item.last_message,
        timestamp: item.last_message_time,
      }));
    } else {
      console.error("Error fetching chat pairs:", response.data.message);
    }
  } catch (error) {
    console.error("API Error:", error);
  }
};

// Lắng nghe sự kiện "new_chat_pair" từ server
const listenForNewChatPairs = () => {
  socket.on("new_chat_pair", (newChatPair) => {
    console.log("New chat pair received:", newChatPair);

    // Thêm đoạn chat mới vào danh sách cặp hội thoại
    chatPairs.value.push({
      contact_id: newChatPair.contact_id,
      last_message: newChatPair.last_message,
      timestamp: newChatPair.timestamp,
    });
  });
};

// Hàm xử lý khi chọn một cặp hội thoại
const selectChat = (contactId) => {
  console.log("Selected Chat:", contactId);
  // Điều hướng đến route chatcontent/:id
  router.push({
    name: "admin.chat", // Tên route đã định nghĩa trong Vue Router
    params: { id: contactId }, // Truyền contactId làm tham số
  });
};

// Hàm định dạng timestamp
const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};

// Lấy danh sách cặp hội thoại khi component được mount
onMounted(() => {
  if (senderId) {
    fetchChatPairs();
  }

  // Tham gia room của người dùng
  socket.emit("join", { userId: senderId, role: "staff" });

  // Lắng nghe các sự kiện từ server
  listenForNewChatPairs();
});

// Ngắt kết nối socket khi component bị hủy
onBeforeUnmount(() => {
  socket.disconnect();
});
</script>

<style scoped>
.chat-list-container {
  margin: 20px;
}
.chat-list ul {
  list-style-type: none;
  padding: 0;
}
.chat-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
.chat-item:hover {
  background-color: #f9f9f9;
}
.chat-info {
  max-width: 70%;
}
.timestamp {
  color: gray;
  font-size: 0.9em;
}
</style>
