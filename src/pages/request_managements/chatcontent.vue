<template>
  <div class="chat-container">
    <div class="chat-header">
      <h3>Chat với: {{ contactName }}</h3>
    </div>
    <div class="chat-content" ref="chatContent">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="[
          'message',
          message.sender_id === senderId ? 'sent' : 'received',
        ]"
      >
        <p class="message-content">{{ message.content }}</p>
        <span class="message-timestamp">{{
          formatTime(message.timestamp)
        }}</span>
      </div>
      <div v-if="isLoading" class="loading-spinner">Đang tải...</div>
    </div>
    <div class="chat-input">
      <textarea
        v-model="newMessage"
        placeholder="Nhập tin nhắn..."
        @keyup.enter="sendMessage"
      ></textarea>
      <button @click="sendMessage">Gửi</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import axios from "axios";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { useRoute } from "vue-router";
import formatDate from "@/helper/format-datetime";

const formatTime = formatDate.formatTime;
const route = useRoute();
const senderId = Cookies.get("staffId");
const socket = io("http://localhost:3000");

const contactId = route.params.id;
const contactName = ref("Tên người nhận");
const messages = ref([]);
const newMessage = ref("");
const currentPage = ref(1);
const hasMorePages = ref(true);
const isLoading = ref(false);

const chatContent = ref(null);

// Hàm kiểm tra nội dung có đủ để kích hoạt cuộn không
const checkContentHeight = () => {
  const chatContentEl = chatContent.value;
  if (chatContentEl) {
    const isScrollable =
      chatContentEl.scrollHeight > chatContentEl.clientHeight;

    if (!isScrollable && hasMorePages.value && !isLoading.value) {
      // Nếu không cuộn được, tự động tải thêm tin nhắn
      fetchMessages();
    }
  }
};

// Lấy danh sách tin nhắn
const fetchMessages = async (isLoadMore = false) => {
  if (isLoading.value || !hasMorePages.value) return;

  isLoading.value = true;

  try {
    const response = await axios.get(
      "http://localhost:3000/api/messages/getMessages",
      {
        params: { senderId, receiverId: contactId, page: currentPage.value },
      }
    );

    if (response.data.status) {
      const newMessages = response.data.listMessages;

      if (isLoadMore) {
        messages.value = [...messages.value, ...newMessages];
      } else {
        messages.value = newMessages;
        nextTick(() => {
          scrollToBottom();
          checkContentHeight(); // Kiểm tra ngay sau khi tải tin nhắn
        });
      }

      if (newMessages.length < 10) {
        hasMorePages.value = false;
      } else {
        currentPage.value += 1;
      }
    } else {
      console.error("Error fetching messages:", response.data.message);
    }
  } catch (error) {
    console.error("API Error:", error);
  } finally {
    isLoading.value = false;
  }
};

// Gửi tin nhắn mới
const sendMessage = async () => {
  if (!newMessage.value.trim()) return;

  try {
    const message = {
      senderId,
      senderType: "staff",
      receiverId: contactId,
      receiverType: "patient",
      content: newMessage.value.trim(),
    };

    const response = await axios.post(
      "http://localhost:3000/api/messages/sendMessage",
      message
    );

    if (response.data.status) {
      // Phát tin nhắn qua socket
      socket.emit("send_message", response.data.message);

      // **Thêm tin nhắn mới vào cuối danh sách**
      messages.value.push(response.data.message);

      // Xóa nội dung ô nhập tin nhắn
      newMessage.value = "";

      // **Cuộn xuống cuối khung chat**
      nextTick(() => {
        scrollToBottom();
      });
    } else {
      console.error("Failed to send message:", response.data.message);
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

// Lắng nghe tin nhắn mới
const listenForMessages = () => {
  socket.on("receive_message", (message) => {
    if (message.sender_id === contactId || message.receiver_id === contactId) {
      // **Thêm tin nhắn vào cuối danh sách**
      messages.value.push(message);

      // **Cuộn xuống cuối khung chat**
      nextTick(() => {
        scrollToBottom();
      });
    }
  });
};

// Cuộn xuống cuối
const scrollToBottom = () => {
  const chatContentEl = chatContent.value;
  if (chatContentEl) {
    chatContentEl.scrollTop = chatContentEl.scrollHeight;
  }
};

// Cuộn lên để tải thêm tin nhắn
const handleScroll = () => {
  const chatContentEl = chatContent.value;
  if (chatContentEl && chatContentEl.scrollTop === 0 && hasMorePages.value) {
    fetchMessages(true);
  }
};

const getNamePatientChat = async () => {
  try {
    const response = await window.axios.get(
      `http://localhost:3000/api/handle/patient/getinfo/${contactId}`
    );

    if (response.status === 200) {
      contactName.value =
        response.data.dataInfo.first_name +
        " " +
        response.data.dataInfo.last_name;
    }
  } catch (error) {
    // Xử lý lỗi và lưu thông báo lỗi
    errorMessage.value =
      error.response?.data?.message || "Lấy thông tin nhân viên";
  }
};

// Khi component được mount
onMounted(() => {
  getNamePatientChat();
  const chatContentEl = chatContent.value;
  if (chatContentEl) {
    chatContentEl.addEventListener("scroll", handleScroll);
  }

  socket.emit("join", { userId: senderId, role: "staff" });
  fetchMessages();

  listenForMessages();
});

// Kiểm tra lại nội dung khi giao diện đã tải xong
nextTick(() => {
  checkContentHeight();
});

// Ngắt kết nối khi component bị hủy
onBeforeUnmount(() => {
  socket.disconnect();

  const chatContentEl = chatContent.value;
  if (chatContentEl) {
    chatContentEl.removeEventListener("scroll", handleScroll);
  }
});
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #ccc;
}

.chat-header {
  padding: 10px;
  background-color: #f1f1f1;
  border-bottom: 1px solid #ccc;
}

.chat-content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #fafafa;
}

.message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  max-width: 70%;
}

.message.sent {
  align-self: flex-end;
  background-color: #dcf8c6;
}

.message.received {
  align-self: flex-start;
  background-color: #ffffff;
}

.message-timestamp {
  font-size: 0.8em;
  color: #888;
  text-align: right;
  margin-top: 5px;
}

.chat-input {
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ccc;
}

.chat-input textarea {
  flex-grow: 1;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
}

.chat-input button {
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #0056b3;
}
</style>
